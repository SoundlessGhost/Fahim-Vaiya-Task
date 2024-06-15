import { configureStore } from '@reduxjs/toolkit';
import offlineSlice from './offlineSlice';

export const store = configureStore({
  reducer: {
    offline: offlineSlice,
  },
});
