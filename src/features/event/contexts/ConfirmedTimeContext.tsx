'use client';

import {
  ActionDispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { useEventQuery } from '../api/event.query';
import { defaultSelectedDateTime } from '../constants';
import { EventType, RecommendedScheduleType, SelectedDateTime } from '../types';
import { eventToDateTime } from '../utils';
import { useParams } from 'next/navigation';

export type ConfirmedTimeReducerAction =
  | {
      type: 'start_picker_selected';
      date: string;
      time: string;
    }
  | {
      type: 'end_picker_selected';
      date: string;
      time: string;
    }
  | {
      type: 'recommended_time_click';
      recommendedTime: RecommendedScheduleType;
    }
  | {
      type: 'sync_with_event';
      event: EventType;
    };

export const ConfirmedTimeContext = createContext<SelectedDateTime>(
  defaultSelectedDateTime,
);
export const ConfirmedTimeDispatchContext = createContext<ActionDispatch<
  [action: ConfirmedTimeReducerAction]
> | null>(null);

export function ConfirmedTimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<{ id: string }>();

  const { data: event } = useEventQuery(params.id);

  const [confirmedTime, dispatch] = useReducer(
    confirmedTimeReducer,
    eventToDateTime(event),
  );

  useEffect(() => {
    dispatch({ type: 'sync_with_event', event });
  }, [event]);

  return (
    <ConfirmedTimeContext value={confirmedTime}>
      <ConfirmedTimeDispatchContext value={dispatch}>
        {children}
      </ConfirmedTimeDispatchContext>
    </ConfirmedTimeContext>
  );
}

export function useConfirmedTime() {
  return useContext(ConfirmedTimeContext);
}

export function useConfirmedTimeDispatch() {
  return useContext(ConfirmedTimeDispatchContext);
}

export default function confirmedTimeReducer(
  confirmedTime: SelectedDateTime,
  action: ConfirmedTimeReducerAction,
) {
  switch (action.type) {
    case 'start_picker_selected':
      return {
        ...confirmedTime,
        start: { date: action.date, time: action.time },
      };
    case 'end_picker_selected':
      return {
        ...confirmedTime,
        end: { date: action.date, time: action.time },
      };
    case 'recommended_time_click':
      return {
        start: {
          date: action.recommendedTime.time_point,
          time: action.recommendedTime.start_time,
        },
        end: {
          date: action.recommendedTime.time_point,
          time: action.recommendedTime.end_time,
        },
      };
    case 'sync_with_event':
      return eventToDateTime(action.event);
  }
}
