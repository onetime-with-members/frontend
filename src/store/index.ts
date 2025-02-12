import eventReducer from './eventSlice';
import fixedSchedulesReducer from './fixedSchedulesSlice';
import sleepTimeReducer from './sleepTimeSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    event: eventReducer,
    fixedSchedules: fixedSchedulesReducer,
    sleepTime: sleepTimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
