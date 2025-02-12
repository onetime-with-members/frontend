import { RootState } from '.';
import { AxiosError } from 'axios';

import { EventType, EventValueType } from '@/types/event.type';
import { RecommendTimeType } from '@/types/schedule.type';
import axios from '@/utils/axios';
import { sortWeekdayList } from '@/utils/weekday';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface EventState {
  event: EventType;
  eventValue: EventValueType;
  qrImageUrl: string;
  recommendedTimes: RecommendTimeType[];
  isNotFound: boolean;
  status: {
    create: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    edit: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    delete: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  };
}

const initialState: EventState = {
  event: {
    event_id: '',
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
    event_status: 'PARTICIPANT',
  },
  eventValue: {
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
  },
  qrImageUrl: '',
  recommendedTimes: [],
  isNotFound: false,
  status: {
    create: 'idle',
    edit: 'idle',
    delete: 'idle',
  },
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    changeEventValue: (state, action: PayloadAction<EventValueType>) => {
      state.eventValue = action.payload;
    },
    resetEventValue: (state) => {
      state.eventValue = initialState.eventValue;
    },
    resetEvent: (state) => {
      state.event = initialState.event;
      state.eventValue = initialState.eventValue;
      state.qrImageUrl = initialState.qrImageUrl;
      state.recommendedTimes = initialState.recommendedTimes;
      state.isNotFound = initialState.isNotFound;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event = action.payload.event;
        state.eventValue = state.event;
        state.event.ranges =
          state.event.category === 'DAY'
            ? sortWeekdayList(state.event.ranges)
            : state.event.ranges.sort();
        state.qrImageUrl = action.payload.qrImageUrl;
        state.recommendedTimes = action.payload.recommendedTimes;
        state.isNotFound = false;
      })
      .addCase(getEvent.rejected, (state, action) => {
        const error = action.payload as AxiosError;
        if (error.response?.status === 404 || error.response?.status === 400) {
          state.isNotFound = true;
        }
      })
      .addCase(createEvent.pending, (state) => {
        state.status.create = 'pending';
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<{ event_id: string }>) => {
          state.status.create = 'fulfilled';
          state.event = {
            ...state.eventValue,
            event_id: action.payload.event_id,
            event_status: 'CREATOR',
          };
          state.eventValue = state.event;
        },
      )
      .addCase(editEvent.pending, (state) => {
        state.status.edit = 'pending';
      })
      .addCase(editEvent.fulfilled, (state) => {
        state.status.edit = 'fulfilled';
        state.event = {
          ...state.event,
          ...state.eventValue,
        };
        state.eventValue = initialState.eventValue;
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
      const qrImageUrlRes = await axios.get(`/events/qr/${eventId}`);

      return {
        event: eventRes.data.payload,
        recommendedTimes: recommendedTimesRes.data.payload,
        qrImageUrl: qrImageUrlRes.data.payload.qr_code_img_url,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const eventValue = state.event.eventValue;

    const res = await axios.post('/events', eventValue);
    return res.data.payload;
  },
);

export const editEvent = createAsyncThunk(
  'event/editEvent',
  async (eventId: string, { getState }) => {
    const state = getState() as RootState;
    const eventValue = state.event.eventValue;

    const res = await axios.patch(`/events/${eventId}`, eventValue);
    return res.data.payload;
  },
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async (eventId: string) => {
    const res = await axios.delete(`/events/${eventId}`);
    return res.data.payload;
  },
);

export const { changeEventValue, resetEventValue, resetEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
