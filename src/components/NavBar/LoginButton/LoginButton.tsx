import { useTranslations } from 'next-intl';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('navbar');

  function handleLoginClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    router.push(`/login?redirect_url=${pathname}`);
  }

  return (
    <Link
      href="/login"
      className="flex items-center text-lg-200"
      onClick={handleLoginClick}
    >
      {t('login')}
    </Link>
  );
}
