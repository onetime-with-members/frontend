import { AxiosError } from 'axios';

import { EventType, EventValueType } from '@/types/event.type';
import { RecommendTimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { sortWeekdayList } from '@/utils/weekday';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface EventState {
  event: EventType;
  eventValue: EventValueType;
  recommendedTimes: RecommendTimeType[];
  isNotFound: boolean;
  status: {
    delete: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  };
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
  eventValue: {
    title: '',
    start_time: '',
    end_time: '',
    category: 'DATE',
    ranges: [],
  },
  recommendedTimes: [],
  isNotFound: false,
  status: {
    delete: 'idle',
  },
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    changeEvent: (state, action: PayloadAction<EventValueType>) => {
      state.eventValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event = action.payload.event;
        state.eventValue = action.payload.event;
        state.event.ranges =
          state.event.category === 'DAY'
            ? sortWeekdayList(state.event.ranges)
            : state.event.ranges.sort();
        state.recommendedTimes = action.payload.recommendedTimes;
        state.isNotFound = false;
      })
      .addCase(getEvent.rejected, (state, action) => {
        const error = action.payload as AxiosError;
        if (error.response?.status === 404 || error.response?.status === 400) {
          state.isNotFound = true;
        }
      })
      .addCase(deleteEvent.pending, (state) => {
        state.status.delete = 'pending';
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.status.delete = 'fulfilled';
        state.event = initialState.event;
        state.eventValue = initialState.eventValue;
      });
  },
});

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async (eventId: string, { rejectWithValue }) => {
    try {
      const eventRes = await axios.get(`/events/${eventId}`);
      const recommendedTimesRes = await axios.get(`/events/${eventId}/most`);

      return {
        event: eventRes.data.payload,
        recommendedTimes: recommendedTimesRes.data.payload,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (eventId: string) => {
    const res = await axios.delete(`/events/${eventId}`);
    return res.data.payload;
  },
);

export const { changeEvent } = eventSlice.actions;

export default eventSlice.reducer;
