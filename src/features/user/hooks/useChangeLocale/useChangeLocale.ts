import { Locale } from 'next-intl';
import { useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

export default function useChangeLocale() {
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  function changeLocale(locale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname, params },
        { locale, scroll: false },
      );
    });
  }

  return changeLocale;
}
