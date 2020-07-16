import { createSlice, createSelector } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

export const SLICE_NAME = 'export';

export const selectSettings = state => state[SLICE_NAME];
export const selectWidth = createSelector([selectSettings], settings => settings.width);
export const selectHeight = createSelector([selectSettings], settings => settings.height);
export const selectExporting = createSelector([selectSettings], settings => settings.exporting);

export const selectSerializedState = createSelector([selectSettings], settings => {
  return omit(settings, 'exporting', 'width', 'height');
});

export default toolActions =>
  createSlice({
    name: SLICE_NAME,
    initialState: {
      exporting: false,
      width: 900,
      height: 600,
    },
    reducers: {
      updateSettings(state, action) {
        for (const [key, value] of Object.entries(action.payload)) {
          state[key] = value;
        }
      },
      updateExporting(state, action) {
        state.exporting = action.payload;
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
