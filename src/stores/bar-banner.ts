import { setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { create } from 'zustand';

import { BarBanner } from '@/types/banner.type';

interface BarBannerStore {
  isShown: boolean;
  barBanner: BarBanner;
  actions: {
    showBarBanner: () => void;
    hideBarBanner: () => void;
    setBarBanner: (banner: BarBanner) => void;
    closeBarBanner: () => void;
  };
}

const useBarBannerStore = create<BarBannerStore>((set, get) => ({
  isShown: false,
  barBanner: {
    id: 0,
    content_kor: '',
    content_eng: '',
    background_color_code: '',
    text_color_code: '',
    is_activated: false,
    created_date: '',
    link_url: '',
  },
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
    setBarBanner: (banner: BarBanner) => {
      set(() => ({
        barBanner: banner,
      }));
    },
    closeBarBanner: () => {
      setCookie('bar-banner', 'false', {
        expires: dayjs().add(1, 'day').hour(0).minute(0).second(0).toDate(),
      });
      get().actions.hideBarBanner();
    },
  },
}));

export default useBarBannerStore;
