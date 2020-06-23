import { createSlice, createSelector } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

import { getLayerDef, getDatesFromInterval } from 'utils/map';
import { BASEMAPS, ATTRIBUTIONS, DATA_LAYERS } from 'components/map';

export const SLICE_NAME = 'map';

export const selectViewports = state => state[SLICE_NAME].viewports;
export const selectBasemap = state => state[SLICE_NAME].basemap;
export const selectBasemapParams = state => state[SLICE_NAME].basemapParams;
export const selectContextualLayers = state => state[SLICE_NAME].contextualLayers;
export const selectRecentImagery = state => state[SLICE_NAME].recentImagery;
export const selectLayers = state => state[SLICE_NAME].layers;
export const selectDataLayers = () => DATA_LAYERS;

export const selectBasemapLayerDef = createSelector(
  [selectBasemap, selectBasemapParams],
  (basemap, basemapParams) => {
    if (!BASEMAPS[basemap].url) {
      return null;
    }

    let basemapUrls;
    if (typeof BASEMAPS[basemap].url === 'function') {
      basemapUrls = BASEMAPS[basemap].url(basemapParams);

      if (basemapUrls === null) {
        return null;
      }
    } else if (Array.isArray(BASEMAPS[basemap].url)) {
      basemapUrls = BASEMAPS[basemap].url;
    } else {
      basemapUrls = [BASEMAPS[basemap].url];
    }

    if (typeof BASEMAPS[basemap].url !== 'function' && basemapParams) {
      basemapUrls = basemapUrls.map(url =>
        Object.keys(basemapParams).reduce(
          (res, key) => url.replace(`{${key}}`, basemapParams[key]),
          url
        )
      );
    }

    return {
      id: basemap,
      type: 'raster',
      source: {
        type: 'raster',
        tiles: basemapUrls,
        minzoom: BASEMAPS[basemap].minZoom,
        maxzoom: BASEMAPS[basemap].maxZoom,
      },
      zIndex: 1, // 1 is the minimum we can assign
    };
  }
);

export const selectActiveDataLayers = createSelector([selectLayers], layers => Object.keys(layers));

export const selectActiveDataLayersInteractiveIds = createSelector(
  [selectActiveDataLayers],
  activeDataLayers =>
    activeDataLayers
      .filter(layerId => DATA_LAYERS[layerId].config.interactiveLayerIds)
      .reduce((res, layerId) => [...res, ...DATA_LAYERS[layerId].config.interactiveLayerIds], [])
);

export const selectExportTemporalDiffLayers = createSelector([selectActiveDataLayers], layers =>
  layers
    .filter(layer => !!DATA_LAYERS[layer].legend?.timeline)
    .reduce((res, layer) => {
      const { minDate, maxDate, interval, dateFormat, marks } = DATA_LAYERS[layer].legend.timeline;
      return {
        ...res,
        [layer]: getDatesFromInterval([minDate, maxDate], interval, dateFormat, marks),
      };
    }, {})
);

export const selectLegendDataLayers = createSelector(
  [selectDataLayers, selectActiveDataLayers, selectLayers],
  (dataLayers, activeDataLayers, layers) => {
    const activeLayers = Object.keys(dataLayers)
      .map(layerId => ({
        ...dataLayers[layerId],
        id: layerId,
      }))
      .filter(layer => activeDataLayers.indexOf(layer.id) !== -1);

    const layerGroups = activeLayers.map(layer => ({
      id: layer.id,
      dataset: layer.id,
      visibility: layers[layer.id].visible,
      readonly: false,
      layers: [
        {
          name: layer.label,
          opacity: layers[layer.id].opacity,
          order: layers[layer.id].order,
          legendConfig: layer.legend,
          timelineParams: layer.legend?.timeline
            ? {
                ...layer.legend?.timeline,
                startDate: layers[layer.id].dateRange?.[0] || layer.legend?.timeline.minDate,
                endDate: layers[layer.id].currentDate || layer.legend?.timeline.maxDate,
                trimEndDate: layers[layer.id].dateRange?.[1] || layer.legend?.timeline.maxDate,
              }
            : undefined,
        },
      ],
    }));

    const sortedLayerGroups = layerGroups.sort((groupA, groupB) =>
      groupA.layers[0].order < groupB.layers[0].order ? 1 : -1
    );

    return sortedLayerGroups;
  }
);

export const selectActiveLayersDef = createSelector(
  [selectBasemapLayerDef, selectDataLayers, selectActiveDataLayers, selectLayers],
  (basemapLayerDef, dataLayers, activeDataLayers, layers) => [
    ...activeDataLayers.map(layerId => getLayerDef(layerId, dataLayers[layerId], layers[layerId])),
    ...(basemapLayerDef ? [basemapLayerDef] : []),
  ]
);

export const selectAttributions = createSelector(
  [
    selectBasemap,
    selectBasemapParams,
    selectDataLayers,
    selectActiveDataLayers,
    selectRecentImagery,
  ],
  (basemap, basemapParams, dataLayers, activeDataLayers, recentImagery) => {
    const basemapAttributions = BASEMAPS[basemap].attributions
      ? BASEMAPS[basemap].attributions
      : [];

    const layerAttributions = activeDataLayers
      .map(layerId => dataLayers[layerId].attributions || [])
      .reduce((res, attr) => [...res, ...attr], []);

    // TODO: we shouldn't display the attributions when more than one map is shown at once because
    // the layer is not displayed on the map
    const recentImageryAttributions = recentImagery?.tileUrl ? ['rw'] : [];

    const uniqueAttributions = [
      ...new Set([...basemapAttributions, ...layerAttributions, ...recentImageryAttributions]),
    ];

    let basemapNotes;
    if (basemapParams) {
      const allParamsSet = Object.values(basemapParams).every(
        param => param !== undefined && param !== null && param !== ''
      );

      if (allParamsSet) {
        if (basemapParams.period !== undefined && basemapParams.year !== undefined) {
          basemapNotes = `Basemap images from ${basemapParams.period} ${basemapParams.year}`;
        } else if (basemapParams.year !== undefined) {
          basemapNotes = `Basemap images from ${basemapParams.year}`;
        }
      }
    }

    return `${basemapNotes ? `${basemapNotes}, ` : ''}${
      uniqueAttributions.length
        ? `${uniqueAttributions.map(attr => ATTRIBUTIONS[attr]).join(', ')}, `
        : ''
    }© <a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener noreferrer">Mapbox</a>, © <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>`;
  }
);

export const selectSerializedState = createSelector(
  [
    selectViewports,
    selectBasemap,
    selectBasemapParams,
    selectContextualLayers,
    selectRecentImagery,
    selectLayers,
  ],
  (viewports, basemap, basemapParams, contextualLayers, recentImagery, layers) => {
    return {
      viewports: viewports.map(viewport => omit(viewport, 'transitionDuration', 'bounds')),
      basemap,
      basemapParams: omit(basemapParams, 'key'),
      contextualLayers,
      recentImagery,
      layers,
    };
  }
);

export default toolActions =>
  createSlice({
    name: SLICE_NAME,
    initialState: {
      // Each viewport correspond to a map
      viewports: [
        {
          zoom: 2,
          latitude: 27,
          longitude: 12,
          transitionDuration: 250,
          bounds: null,
        },
      ],
      basemap: 'mongabay-paper',
      basemapParams: null,
      contextualLayers: ['labels-none', 'hillshade'],
      recentImagery: null,
      layers: {
        'tree-cover': {
          visible: true,
          opacity: 1,
          order: 0,
        },
        'primary-forests': {
          visible: true,
          opacity: 1,
          order: 1,
        },
      },
    },
    reducers: {
      updateViewports(state, action) {
        state.viewports = new Array(state.viewports.length).fill(action.payload);
      },
      updateViewport(state, action) {
        const { index, viewport } = action.payload;
        const { transitionDuration } = state.viewports[index];

        state.viewports.splice(index, 1, {
          ...viewport,
          transitionDuration,
        });
      },
      updateBasemap(state, action) {
        state.basemap = action.payload.basemap;
        state.basemapParams = action.payload.params || null;
      },
      updateBasemapParams(state, action) {
        state.basemapParams = action.payload;
      },
      addContextualLayer(state, action) {
        const layerIndex = state.contextualLayers.indexOf(action.payload);
        if (layerIndex === -1) {
          state.contextualLayers.push(action.payload);
        }
      },
      removeContextualLayer(state, action) {
        const layerIndex = state.contextualLayers.indexOf(action.payload);
        if (layerIndex !== -1) {
          state.contextualLayers.splice(layerIndex, 1);
        }
      },
      updateContextualLayers(state, action) {
        state.contextualLayers = action.payload;
      },
      updateRecentImagery(state, action) {
        state.recentImagery = action.payload;
      },
      addLayer(state, action) {
        state.layers[action.payload] = {
          visible: true,
          opacity: 1,
          // Like z-index, the higher = on top
          order: Object.keys(state.layers).length,
        };
      },
      removeLayer(state, action) {
        const order = state.layers[action.payload].order;

        delete state.layers[action.payload];

        // We make sure to update the order of all the layers
        Object.keys(state.layers).forEach(layerId => {
          if (state.layers[layerId].order > order) {
            state.layers[layerId].order -= 1;
          }
        });
      },
      updateActiveLayers(state, action) {
        state.layers = {};
        action.payload.forEach((layerId, index) => {
          state.layers[layerId] = {
            visible: true,
            opacity: 1,
            // Like z-index, the higher = on top
            order: index,
          };
        });
      },
      updateLayer(state, action) {
        state.layers[action.payload.id] = {
          ...state.layers[action.payload.id],
          ...omit(action.payload, 'id'),
        };
      },
      updateLayerOrder(state, action) {
        const mapLayerToOrder = action.payload
          // We remove the IDs that correspond to the boundaries
          .filter(layerId => !!DATA_LAYERS[layerId])
          .reduce((res, layerId, index) => ({ ...res, [layerId]: index }), {});

        Object.keys(state.layers).forEach(layerId => {
          state.layers[layerId].order = mapLayerToOrder[layerId];
        });
      },
    },
    extraReducers: {
      [toolActions.restoreState.fulfilled]: (state, action) => {
        const stateToRestore = action.payload[SLICE_NAME] || {};

        return {
          ...state,
          ...stateToRestore,
        };
      },
    },
  });
