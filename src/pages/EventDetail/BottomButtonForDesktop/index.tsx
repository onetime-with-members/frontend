import { useContext } from 'react';

import BadgeFloatingBottomButton from '@/components/floating-button/BadgeFloatingBottomButton';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/utils/cn';

interface BottomButtonForDesktopProps {
  handleFloatingButtonClick: () => void;
}

export default function BottomButtonForDesktop({
  handleFloatingButtonClick,
}: BottomButtonForDesktopProps) {
  const { isFooterShown } = useContext(FooterContext);

  return (
    <BadgeFloatingBottomButton
      name="스케줄 추가"
      variant="black"
      onClick={handleFloatingButtonClick}
      className={cn('hidden duration-150 md:block', {
        'pointer-events-none opacity-0': isFooterShown,
      })}
    />
  );
}
