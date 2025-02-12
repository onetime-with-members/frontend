import { useContext } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/button/Button/Button';
import { PageModeContext } from '@/contexts/PageModeContext';
import { RootState } from '@/store';

interface BottomButtonProps {
  handleSubmit: () => void;
  disabled: boolean;
}

export default function BottomButton({
  handleSubmit,
  disabled,
}: BottomButtonProps) {
  const { status } = useSelector((state: RootState) => state.event);

  const { pageMode } = useContext(PageModeContext);

  return (
    <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
      <Button
        onClick={handleSubmit}
        disabled={disabled}
        variant="black"
        fullWidth
      >
        {pageMode === 'create' &&
          (status.create === 'pending'
            ? '이벤트 생성 중...'
            : '이벤트 생성하기')}
        {pageMode === 'edit' &&
          (status.edit === 'pending' ? '이벤트 수정 중...' : '이벤트 수정하기')}
      </Button>
    </div>
  );
}
