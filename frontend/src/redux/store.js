import { configureStore } from '@reduxjs/toolkit';

import robotReducer from '../features/robotSlice';

export default configureStore({
  reducer: {
    robots: robotReducer
  }
})