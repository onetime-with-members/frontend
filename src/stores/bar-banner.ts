import { create } from 'zustand';

interface BarBannerStore {
  isShown: boolean;
  actions: {
    showBarBanner: () => void;
    hideBarBanner: () => void;
  };
}

const useToastStore = create<BarBannerStore>((set) => ({
  isShown: true,
  actions: {
    showBarBanner: () => {
      set(() => ({
        isShown: true,
      }));
    },
    hideBarBanner: () => {
      set(() => ({
        isShown: false,
      }));
    },
  },
}));

export const useBarBanner = () => useToastStore((state) => state.isShown);
export const useBarBannerActions = () =>
  useToastStore((state) => state.actions);
