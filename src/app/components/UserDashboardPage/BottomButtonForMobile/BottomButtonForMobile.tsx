import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button/Button/Button';
import { FooterContext } from '@/contexts/FooterContext';
import { useRouter } from '@/navigation';
import cn from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';

export default function BottomButtonForMobile() {
  const { isFooterShown } = useContext(FooterContext);

  const router = useRouter();
  const t = useTranslations('userDashboard');

  function handleFloatingBottomButtonClick() {
    router.push('/events/new');
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-10 w-full bg-gray-00 p-4 shadow-[0px_-4px_32px_0px_rgba(0,0,0,0.05)] transition-opacity duration-300 md:hidden',
        {
          'pointer-events-none opacity-0': isFooterShown,
        },
      )}
    >
      <div className="mx-auto w-full max-w-screen-md">
        <Button
          variant="dark"
          onClick={handleFloatingBottomButtonClick}
          fullWidth
        >
          <span className="flex items-center justify-center gap-1">
            <span>{t('createEvent')}</span>
            <span>
              <IconPlus size={24} />
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}
