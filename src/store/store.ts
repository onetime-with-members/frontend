import fixedSchedulesReducer from './fixed-schedules';
import sleepTimeReducer from './sleep-time';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    sleepTime: sleepTimeReducer,
    fixedSchedules: fixedSchedulesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
