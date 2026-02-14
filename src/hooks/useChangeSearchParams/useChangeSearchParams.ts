import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function useChangeSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function removeSearchParams(keyList: string[]) {
    const urlSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
    keyList.forEach((key) => urlSearchParams.delete(key));
    const newSearchParamsStr = urlSearchParams.toString();
    const newQuery = newSearchParamsStr ? `?${newSearchParamsStr}` : '';

    router.replace(`${pathname}${newQuery}`, { scroll: false });
  }

  return { removeSearchParams };
}
