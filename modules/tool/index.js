import { createSelector, createAsyncThunk } from '@reduxjs/toolkit';

import { deserialize, serialize } from 'utils/functions';
import { selectQuery } from '../routing';
import createExportSlice, * as exportModule from './export';
import createTraseSlice, * as traseModule from './world-map';

// Common actions for the tool module
const actions = {
  restoreState: createAsyncThunk('tool/restoreState', (_, { getState }) => {
    const state = getState();
    const query = selectQuery(state);
    return deserialize(query.state);
  }),
};

// Slices belonging to the tool module
const exportSlice = createExportSlice(actions);
const traseSlice = createTraseSlice(actions);

// Common selectors for the tool module
const selectors = {
  selectSerializedState: createSelector(
    [exportModule.selectSerializedState, traseModule.selectSerializedState],
    (exportState, traseState) =>
      serialize({
        [exportModule.SLICE_NAME]: exportState,
        [traseModule.SLICE_NAME]: traseState,
      })
  ),
};

export const toolActions = actions;
export const toolSelectors = selectors;

export const traseReducer = traseSlice.reducer;
export const traseActions = traseSlice.actions;
export const traseSelectors = traseModule;

export const exportReducer = exportSlice.reducer;
export const exportActions = exportSlice.actions;
export const exportSelectors = exportModule;
