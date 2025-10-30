import { useTranslations } from 'next-intl';

import GrayButton from './GrayButton';
import { useAuth } from '@/lib/auth';
import { useProgressRouter } from '@/navigation';

export default function ProfileActions() {
  const progressRouter = useProgressRouter();
  const t = useTranslations('profile');

  const { signOut } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <GrayButton onClick={() => progressRouter.push('/mypage/profile/edit')}>
        {t('editProfile')}
      </GrayButton>
      <GrayButton onClick={async () => await signOut({ redirectTo: '/' })}>
        {t('logout')}
      </GrayButton>
    </div>
  );
}
