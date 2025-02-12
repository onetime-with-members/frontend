import { AxiosError } from 'axios';

import { EventType } from '@/types/event.type';
import axios from '@/utils/axios';
import { sortWeekdayList } from '@/utils/weekday';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface EventState {
  event: EventType;
  isNotFound: boolean;
}

const initialState: EventState = {
  event: {
    event_id: '',
    title: '',
    start_time: '',
    end_time: '',
    category: 'DATE',
    ranges: [],
    event_status: 'PARTICIPANT',
  },
  isNotFound: false,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event = action.payload;
        state.event.ranges =
          state.event.category === 'DAY'
            ? sortWeekdayList(state.event.ranges)
            : state.event.ranges.sort();
        state.isNotFound = false;
      })
      .addCase(getEvent.rejected, (state, action) => {
        const error = action.payload as AxiosError;
        if (error.response?.status === 404 || error.response?.status === 400) {
          state.isNotFound = true;
        }
      });
  },
});

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/events/${eventId}`);
      return res.data.payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const {} = eventSlice.actions;

export default eventSlice.reducer;
