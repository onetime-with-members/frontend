import { RootState } from '.';
import dayjs from 'dayjs';

import { SleepTime } from '@/types/user.type';
import axios from '@/utils/axios';
import { timeBlockList } from '@/utils/time-block';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface SleepTimeState {
  sleepTime: SleepTime;
  originalSleepTime: SleepTime;
  sleepTimesList: string[];
  timeBlockGroup: string[][];
  timeLabelGroup: string[][];
}

const initialState: SleepTimeState = {
  sleepTime: {
    start: '00:00',
    end: '00:00',
  },
  originalSleepTime: {
    start: '00:00',
    end: '00:00',
  },
  sleepTimesList: [],
  timeBlockGroup: [],
  timeLabelGroup: [],
};

const sleepTimeSlice = createSlice({
  name: 'sleepTime',
  initialState,
  reducers: {
    changeSleepTime(state, action: PayloadAction<SleepTime>) {
      state.sleepTime = action.payload;
      state.sleepTimesList = sleepTimesList(action.payload);
      state.timeBlockGroup = timesGroupForSplittedTimeBlock(
        state.sleepTime,
        state.sleepTimesList,
        'timeBlock',
      );
      state.timeLabelGroup = timesGroupForSplittedTimeBlock(
        state.sleepTime,
        state.sleepTimesList,
        'timeLabel',
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSleepTime.fulfilled,
        (state, action: PayloadAction<SleepTime>) => {
          state.sleepTime = action.payload;
          state.originalSleepTime = action.payload;
          state.sleepTimesList = sleepTimesList(action.payload);
          state.timeBlockGroup = timesGroupForSplittedTimeBlock(
            state.sleepTime,
            state.sleepTimesList,
            'timeBlock',
          );
          state.timeLabelGroup = timesGroupForSplittedTimeBlock(
            state.sleepTime,
            state.sleepTimesList,
            'timeLabel',
          );
        },
      )
      .addCase(editSleepTime.fulfilled, (state) => {
        state.originalSleepTime = state.sleepTime;
      });
  },
});

export const getSleepTime = createAsyncThunk(
  'sleepTime/getSleepTime',
  async () => {
    const res = await axios.get('/users/sleep-time');

    const { sleep_start_time, sleep_end_time } = res.data.payload;

    return {
      start: sleep_start_time,
      end: sleep_end_time,
    } as SleepTime;
  },
);

export const editSleepTime = createAsyncThunk(
  'sleepTime/editSleepTime',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const sleepTime = state.sleepTime.sleepTime;

    const res = await axios.put('/users/sleep-time', {
      sleep_start_time: sleepTime.start,
      sleep_end_time: sleepTime.end,
    });
    return res.data.payload;
  },
);

function sleepTimesList(sleepTime: SleepTime) {
  return isSame(sleepTime.start, sleepTime.end)
    ? []
    : isBefore(sleepTime.start, sleepTime.end)
      ? timeBlockList(sleepTime.start, sleepTime.end)
      : [
          ...timeBlockList(sleepTime.start, '24:00'),
          ...timeBlockList('00:00', sleepTime.end),
        ];

  function isSame(time1: string, time2: string) {
    return dayjs(time1, 'HH:mm').isSame(dayjs(time2, 'HH:mm'));
  }

  function isBefore(time1: string, time2: string) {
    return dayjs(time1, 'HH:mm').isBefore(dayjs(time2, 'HH:mm'));
  }
}

function timesGroupForSplittedTimeBlock(
  sleepTime: SleepTime,
  sleepTimesList: string[],
  type: 'timeBlock' | 'timeLabel',
) {
  const result = [];

  if (sleepTime.start >= sleepTime.end) {
    let newTimesList: string[] = [];

    if (type === 'timeBlock') {
      newTimesList = timeBlockList('00:00', '24:00', '30m');
      newTimesList = newTimesList.filter(
        (timeLabel) => !sleepTimesList.includes(timeLabel),
      );
    } else if (type === 'timeLabel') {
      newTimesList = timeBlockList('00:00', '24:00', '1h');
      newTimesList = newTimesList.filter(
        (timeLabel) => !sleepTimesList.includes(timeLabel),
      );
      newTimesList.push(sleepTime.start);
    }

    result.push(newTimesList);
  } else {
    let newTimesList1: string[] = [];
    let newTimesList2: string[] = [];

    if (type === 'timeBlock') {
      newTimesList1 = timeBlockList('00:00', sleepTime.start, '30m');
      newTimesList2 = timeBlockList(sleepTime.end, '24:00', '30m');

      (newTimesList1 = newTimesList1.filter(
        (timeLabel) => !sleepTimesList.includes(timeLabel),
      )),
        (newTimesList2 = newTimesList2.filter(
          (timeLabel) => !sleepTimesList.includes(timeLabel),
        ));
    } else if (type === 'timeLabel') {
      newTimesList1 = timeBlockList('00:00', sleepTime.start, '1h');
      newTimesList2 = timeBlockList(sleepTime.end, '24:00', '1h');

      (newTimesList1 = newTimesList1.filter(
        (timeLabel) => !sleepTimesList.includes(timeLabel),
      )),
        (newTimesList2 = newTimesList2.filter(
          (timeLabel) => !sleepTimesList.includes(timeLabel),
        ));

      if (sleepTime.start !== '00:00') {
        newTimesList1.push(sleepTime.start);
      }
      newTimesList2.push('24:00');
    }

    result.push(newTimesList1, newTimesList2);
  }

  return result;
}

export const { changeSleepTime } = sleepTimeSlice.actions;

export default sleepTimeSlice.reducer;
