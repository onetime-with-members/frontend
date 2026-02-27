import { useShortUrlQuery } from '../../api/event.query';
import { usePathname } from '@/i18n/navigation';

export default function useShortUrl() {
  const pathname = usePathname();

  const { data: shortUrl } = useShortUrlQuery(
    typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '',
    {
      enabled: typeof window !== 'undefined',
    },
  );

  return shortUrl;
}
