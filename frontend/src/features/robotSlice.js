import { createSlice } from '@reduxjs/toolkit';

export const robotsSlice = createSlice({
  name: 'robots',
  initialState: {
    robots: []
  },
  reducers: {
    createRobots: (state, action) => {
      state.robots = action.payload;
    }
  }
})

export const { createRobots } = robotsSlice.actions;

export default robotsSlice.reducer;