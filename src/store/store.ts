import { configureStore } from '@reduxjs/toolkit';
import lightsReducer from './lightsSlice';

export const store = configureStore({
  reducer: {
    lights: lightsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;