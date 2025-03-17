import { useEffect } from 'react';

export default function useLocalStorageClear() {
  useEffect(() => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('last-login');
    localStorage.removeItem('redirect-url');
    localStorage.removeItem('language');
    localStorage.removeItem('locale');
    localStorage.removeItem('i18nextLng');
  }, []);
}
