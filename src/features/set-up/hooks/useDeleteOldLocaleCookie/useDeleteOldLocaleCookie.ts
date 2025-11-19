import { deleteCookie } from 'cookies-next';
import { useEffect } from 'react';

export default function useDeleteOldLocaleCookie() {
  useEffect(() => {
    async function deleteOldLocaleCookie() {
      await deleteCookie('locale');
    }
    deleteOldLocaleCookie();
  }, []);
}
