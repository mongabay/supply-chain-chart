import { createSlice } from '@reduxjs/toolkit';
import initialState from './trase-options';

const updateTraseParams = createSlice({
  name: 'trase',
  initialState: initialState,
  reducers: {
    changeTraseConfig(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export default updateTraseParams;
