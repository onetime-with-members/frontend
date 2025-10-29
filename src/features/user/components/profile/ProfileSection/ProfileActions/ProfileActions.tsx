import { useTranslations } from 'next-intl';

import GrayButton from './GrayButton';
import useHomeUrl from '@/hooks/useHomeUrl';
import { useAuth } from '@/lib/auth';
import { useProgressRouter } from '@/navigation';

export default function ProfileActions() {
  const progressRouter = useProgressRouter();
  const t = useTranslations('profile');

  const { signOut } = useAuth();
  const homeUrl = useHomeUrl();

  return (
    <div className="flex items-center gap-4">
      <GrayButton onClick={() => progressRouter.push('/mypage/profile/edit')}>
        {t('editProfile')}
      </GrayButton>
      <GrayButton onClick={async () => await signOut({ redirectTo: homeUrl })}>
        {t('logout')}
      </GrayButton>
    </div>
  );
}
