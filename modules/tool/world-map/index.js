import { createSlice, createSelector } from '@reduxjs/toolkit';
import bbox from 'turf-bbox';
import lineString from 'turf-linestring';
import { COUNTRIES_COORDINATES, initialState } from 'modules/tool/world-map/trase-options';

export const SLICE_NAME = 'trase';

export const selectSettings = state => state[SLICE_NAME];
export const getSelectedContext = state => state[SLICE_NAME] && state[SLICE_NAME].context;
export const selectCommodity = createSelector([selectSettings], settings => settings.Commodity);
export const selectYear = createSelector([selectSettings], settings => settings.Year);
export const selectUnit = createSelector([selectSettings], settings => settings['Change unit']);

export const getOriginCountry = createSelector(
  [selectSettings],
  settings => settings['Source country']
);
export const getDestinationCountry = createSelector(
  [selectSettings],
  settings => settings['Destination country']
);
export const getTopNodes = state => state[SLICE_NAME] && state[SLICE_NAME].topNodes;

export const selectUnitLabel = createSelector([getTopNodes], topNodes =>
  topNodes.length ? topNodes[0].attribute.unit : null
);

export const getOriginGeoId = createSelector(getSelectedContext, selectedContext =>
  selectedContext ? selectedContext.worldMap.geoId : null
);

export const getOriginCoordinates = createSelector(getOriginGeoId, originGeoId =>
  originGeoId ? COUNTRIES_COORDINATES[originGeoId] : null
);

export const getWorldMapFlows = createSelector(
  [getOriginGeoId, getOriginCoordinates, getDestinationCountry, getTopNodes],
  (originGeoId, originCoordinates, destination, countries) => {
    if (!originGeoId || !originCoordinates || !countries) {
      return [];
    }

    const flows =
      countries
        ?.filter(country => {
          let res = country.geo_id !== originGeoId;

          if (destination) {
            res = res && country.geo_id === destination;
          }

          return res;
        })
        .sort((a, b) => {
          if (a.value < b.value) return -1;
          if (a.value > b.value) return 1;
          return 0;
        }) ?? [];

    const valueExtent = [
      Math.min(...flows.map(f => f.attribute.value)),
      Math.max(...flows.map(f => f.attribute.value)),
    ];

    const strokeWidthScale = value =>
      ((value - valueExtent[0]) / (valueExtent[1] - valueExtent[0])) * 9 + 1;

    const contextFlows = flows.map(flow => ({
      ...flow,
      strokeWidth: strokeWidthScale(flow.attribute.value),
      coordinates: COUNTRIES_COORDINATES[flow.geo_id],
      geoId: flow.geo_id,
    }));

    const contextFlowsWithCoordinates = contextFlows.filter(
      f => typeof f.coordinates !== 'undefined'
    );

    if (contextFlowsWithCoordinates.length !== contextFlows.length) {
      console.warn('World map flows are missing geoids. Check your database.');
    }

    const [minX, , maxX] = bbox(
      lineString(
        contextFlowsWithCoordinates.map(f => f.coordinates),
        {} // properties
      )
    );
    const medianX = (maxX + minX) / 2;
    const originLeftOfBbox = originCoordinates[0] < medianX;
    const pointOfControl = {
      x: originLeftOfBbox ? minX - 10 : maxX + 10,
    };

    const getCurveStyle = destination => {
      if (destination[0] < pointOfControl.x) {
        // left
        return 'forceDown';
      }
      // right
      return 'forceUp';
    };

    return contextFlowsWithCoordinates.map(destination => ({
      ...destination,
      curveStyle: getCurveStyle(destination.coordinates),
    }));
  }
);

export default traseActions =>
  createSlice({
    name: SLICE_NAME,
    initialState: initialState,
    reducers: {
      changeTraseConfig(state, action) {
        Object.entries(action.payload).map(([key, value]) => {
          state[key] = value;
        });
      },
    },
    extraReducers: {
      [traseActions.restoreState.fulfilled]: (state, action) => {
        const stateToRestore = action.payload[SLICE_NAME] || {};

        return {
          ...state,
          ...stateToRestore,
        };
      },
    },
  });
