import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import BadgeFloatingBottomButton from '@/components/button/BadgeFloatingBottomButton/BadgeFloatingBottomButton';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/lib/cn';

interface BottomButtonForDesktopProps {
  handleFloatingButtonClick: () => void;
}

export default function BottomButtonForDesktop({
  handleFloatingButtonClick,
}: BottomButtonForDesktopProps) {
  const { isFooterShown } = useContext(FooterContext);

  const t = useTranslations('eventDetail');

  return (
    <BadgeFloatingBottomButton
      name={t('addSchedule')}
      variant="black"
      onClick={handleFloatingButtonClick}
      className={cn('hidden duration-150 md:block', {
        'pointer-events-none opacity-0': isFooterShown,
      })}
    />
  );
}
