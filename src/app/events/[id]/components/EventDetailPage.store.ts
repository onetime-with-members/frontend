import { create } from 'zustand';

import { ScheduleType } from '@/types/schedule.type';

interface ParticipantsStore {
  participants: string[];
  actions: {
    setParticipants: (schedules: ScheduleType[]) => void;
  };
}

const useParticipantsStore = create<ParticipantsStore>((set) => ({
  participants: [],
  actions: {
    setParticipants: (schedules: ScheduleType[]) => {
      set((state) => ({
        ...state,
        participants: schedules.map((schedule) => schedule.name).sort(),
      }));
    },
  },
}));

export const useParticipants = () =>
  useParticipantsStore((state) => state.participants);
export const useParticipantsActions = () =>
  useParticipantsStore((state) => state.actions);
