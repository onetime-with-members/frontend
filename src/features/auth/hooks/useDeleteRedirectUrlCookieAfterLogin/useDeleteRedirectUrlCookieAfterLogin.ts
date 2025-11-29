import { deleteCookie, getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { REDIRECT_URL } from '../../constants';
import { usePathname } from 'next/navigation';

export default function useDeleteRedirectUrlCookieAfterLogin() {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    (async () => {
      const redirectUrl = `/${locale}${(await getCookie(REDIRECT_URL))!}`;

      if (!pathname.startsWith('/login') && pathname.startsWith(redirectUrl)) {
        await deleteCookie(REDIRECT_URL);
      }
    })();
  }, [pathname, locale]);
}
