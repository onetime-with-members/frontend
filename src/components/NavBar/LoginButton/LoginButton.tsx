import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';
import cn from '@/lib/cn';
import { ProgressLink, useProgressRouter } from '@/navigation';

export default function LoginButton({ disabled }: { disabled?: boolean }) {
  const progressRouter = useProgressRouter();
  const pathname = usePathname();
  const t = useTranslations('navbar');

  function handleLoginClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    progressRouter.push(`/login?redirect_url=${pathname}`);
  }

  return (
    <ProgressLink
      href="/login"
      className={cn('flex items-center text-lg-200', {
        'pointer-events-none': disabled,
      })}
      onClick={handleLoginClick}
    >
      {t('login')}
    </ProgressLink>
  );
}
