import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import BadgeFloatingBottomButton from '@/components/button/BadgeFloatingBottomButton/BadgeFloatingBottomButton';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/utils/cn';

interface BottomButtonForDesktopProps {
  handleFloatingButtonClick: () => void;
}

export default function BottomButtonForDesktop({
  handleFloatingButtonClick,
}: BottomButtonForDesktopProps) {
  const { isFooterShown } = useContext(FooterContext);

  const { t } = useTranslation();

  return (
    <BadgeFloatingBottomButton
      name={t('eventDetail.addSchedule')}
      variant="black"
      onClick={handleFloatingButtonClick}
      className={cn('hidden duration-150 md:block', {
        'pointer-events-none opacity-0': isFooterShown,
      })}
    />
  );
}
