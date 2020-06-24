import { createSlice, createSelector } from '@reduxjs/toolkit';
import bbox from 'turf-bbox';
import lineString from 'turf-linestring';
import { COUNTRIES_COORDINATES, initialState } from 'modules/tool/world-map/trase-options';

export const SLICE_NAME = 'trase';

// sample selectors:
export const selectSettings = state => state[SLICE_NAME];
export const selectCommodity = createSelector([selectSettings], settings => settings.Commodity);
export const selectYear = createSelector([selectSettings], settings => settings.Year);
export const selectCountry = createSelector(
  [selectSettings],
  settings => settings['Source country']
);

export const getSelectedContext = state => state[SLICE_NAME] && state[SLICE_NAME].context;
export const getTopNodes = state =>
  state[SLICE_NAME] && state[SLICE_NAME].topNodes && state[SLICE_NAME].topNodes.targetNodes;

export const getOriginGeoId = createSelector(getSelectedContext, selectedContext =>
  selectedContext ? selectedContext.worldMap.geoId : null
);

export const getOriginCoordinates = createSelector(getOriginGeoId, originGeoId =>
  originGeoId ? COUNTRIES_COORDINATES[originGeoId] : null
);

export const getWorldMapFlows = createSelector(
  [getOriginGeoId, getOriginCoordinates, getTopNodes],
  (originGeoId, originCoordinates, countries) => {
    if (!originGeoId || !originCoordinates || !countries) {
      return [];
    }

    const contextFlows = countries
      ? countries
          .filter(country => country.geoId !== originGeoId)
          .sort((a, b) => {
            if (a.value < b.value) return -1;
            if (a.value > b.value) return 1;
            return 0;
          })
          .map((country, index) => ({
            ...country,
            strokeWidth: index + 1,
            coordinates: COUNTRIES_COORDINATES[country.geo_id],
            geoId: country.geo_id,
          }))
      : [];

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
          // console.log('changing keys', key, value);
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
