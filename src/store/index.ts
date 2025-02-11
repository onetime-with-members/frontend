import sleepTimeReducer from './sleep-time';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    sleepTime: sleepTimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
