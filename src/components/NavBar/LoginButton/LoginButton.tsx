import { useTranslations } from 'next-intl';

import cn from '@/lib/cn';
import { Link, useRouter } from '@/navigation';
import { usePathname } from 'next/navigation';

export default function LoginButton({ disabled }: { disabled?: boolean }) {
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
      className={cn('flex items-center text-lg-200', {
        'pointer-events-none': disabled,
      })}
      onClick={handleLoginClick}
    >
      {t('login')}
    </Link>
  );
}
