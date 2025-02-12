import { RootState } from './store';
import { MyScheduleTimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface FixedSchedulesState {
  fixedSchedules: MyScheduleTimeType[];
  originalFixedSchedules: MyScheduleTimeType[];
  isEdited: boolean;
}

const initialState: FixedSchedulesState = {
  fixedSchedules: [],
  originalFixedSchedules: [],
  isEdited: false,
};

const fixedSchedulesSlice = createSlice({
  name: 'fixedSchedules',
  initialState,
  reducers: {
    changeTimeBlock: (
      state,
      action: PayloadAction<{
        timePoint: string;
        times: string[];
        isFilling: boolean;
      }>,
    ) => {
      const { timePoint, times, isFilling } = action.payload;

      const fixedSchedule = state.fixedSchedules.find(
        (mySchedule) => mySchedule.time_point === timePoint,
      );

      if (fixedSchedule) {
        fixedSchedule.times = isFilling
          ? Array.from(new Set(fixedSchedule.times.concat(times)))
          : fixedSchedule.times.filter((time) => !times.includes(time));
      } else {
        state.fixedSchedules.push({ time_point: timePoint, times });
      }

      state.isEdited = true;
    },
    resetIsEdited: (state) => {
      state.isEdited = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFixedSchedules.fulfilled, (state, action) => {
        state.fixedSchedules = action.payload;
        state.originalFixedSchedules = action.payload;
      })
      .addCase(editFixedSchedules.fulfilled, (state, action) => {
        state.fixedSchedules = action.payload;
        state.originalFixedSchedules = action.payload;
        state.isEdited = false;
      });
  },
});

export const getFixedSchedules = createAsyncThunk(
  'fixedSchedules/getFixedSchedules',
  async () => {
    const res = await axios.get('/fixed-schedules');
    return res.data.payload.schedules;
  },
);

export const editFixedSchedules = createAsyncThunk(
  'fixedSchedules/editFixedSchedules',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const fixedSchedules = state.fixedSchedules.fixedSchedules;

    const res = await axios.put('/fixed-schedules', {
      schedules: fixedSchedules,
    });
    return res.data.payload.schedules;
  },
);

export const { changeTimeBlock, resetIsEdited } = fixedSchedulesSlice.actions;

export default fixedSchedulesSlice.reducer;
