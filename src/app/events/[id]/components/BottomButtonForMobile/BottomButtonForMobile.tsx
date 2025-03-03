import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import Button from '@/components/button/Button/Button';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';
import Image from 'next/image';

interface BottomButtonForMobileProps {
  handleFloatingButtonClick: () => void;
  handleShareButtonClick: () => void;
}

export default function BottomButtonForMobile({
  handleFloatingButtonClick,
  handleShareButtonClick,
}: BottomButtonForMobileProps) {
  const { isFooterShown } = useContext(FooterContext);

  const t = useTranslations('eventDetail');

  return (
    <div
      className={cn(
        'fixed bottom-0 z-10 flex w-full items-center justify-center gap-2 bg-gray-00 p-4 duration-150 md:hidden',
        {
          'pointer-events-none opacity-0': isFooterShown,
        },
      )}
    >
      <button
        className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-gray-80"
        onClick={handleShareButtonClick}
      >
        <Image
          src="/images/send.svg"
          alt="공유 아이콘"
          width={36}
          height={36}
        />
      </button>
      <Button
        onClick={handleFloatingButtonClick}
        variant="dark"
        className="flex-1"
      >
        <span className="flex items-center justify-center gap-1">
          <span>{t('addSchedule')}</span>
          <span>
            <IconPlus size={24} />
          </span>
        </span>
      </Button>
    </div>
  );
}
