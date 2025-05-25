import { create } from 'zustand';

import { ScheduleType } from '@/types/schedule.type';

interface ParticipantsStore {
  participants: string[];
  isLoading: boolean;
  actions: {
    setParticipants: (schedules: ScheduleType[]) => void;
  };
}

const useParticipantsStore = create<ParticipantsStore>((set) => ({
  participants: [],
  isLoading: true,
  actions: {
    setParticipants: (schedules: ScheduleType[]) => {
      set((state) => ({
        ...state,
        participants: schedules.map((schedule) => schedule.name).sort(),
        isLoading: false,
      }));
    },
  },
}));

export const useParticipants = () =>
  useParticipantsStore((state) => state.participants);
export const useParticipantsIsLoading = () =>
  useParticipantsStore((state) => state.isLoading);
export const useParticipantsActions = () =>
  useParticipantsStore((state) => state.actions);
