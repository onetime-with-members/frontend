import { create } from 'zustand';

interface ToastStore {
  message: string;
  actions: {
    toast: (message: string) => void;
    resetMessage: () => void;
  };
}

const useToastStore = create<ToastStore>((set) => ({
  message: '',
  actions: {
    toast: (message: string) => {
      set(() => ({
        message,
      }));
    },
    resetMessage: () => {
      set(() => ({
        message: '',
      }));
    },
  },
}));

export const useToast = () => useToastStore((state) => state.actions.toast);
export const useToastMessage = () => useToastStore((state) => state.message);
export const useToastActions = () => useToastStore((state) => state.actions);
