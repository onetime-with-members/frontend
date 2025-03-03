import { useTranslations } from 'next-intl';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LoginButton() {
  const pathname = usePathname();
  const t = useTranslations('navbar');

  return (
    <Link
      href={`/login?redirect_url=${pathname}`}
      className="flex items-center text-lg-200"
    >
      {t('login')}
    </Link>
  );
}
