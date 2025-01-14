import clsx from 'clsx';
import { useContext } from 'react';

import Button from '../../../../components/button/Button';
import { FooterContext } from '../../../../contexts/FooterContext';
import { IconPlus } from '@tabler/icons-react';

interface BottomButtonForMobileProps {
  handleFloatingButtonClick: () => void;
}

export default function BottomButtonForMobile({
  handleFloatingButtonClick,
}: BottomButtonForMobileProps) {
  const { isFooterShown } = useContext(FooterContext);

  return (
    <div
      className={clsx(
        'fixed bottom-0 flex w-full items-center justify-center bg-gray-00 p-4 duration-150 md:hidden',
        {
          'pointer-events-none opacity-0': isFooterShown,
        },
      )}
    >
      <Button
        className="w-full max-w-screen-sm"
        onClick={handleFloatingButtonClick}
      >
        <span className="flex items-center justify-center gap-1">
          <span>스케줄 추가</span>
          <span>
            <IconPlus size={24} />
          </span>
        </span>
      </Button>
    </div>
  );
}
