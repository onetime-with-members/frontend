import { useContext } from 'react';

import { PageModeContext } from '../../../contexts/PageModeContext';
import Button from '../../button/Button';

interface BottomButtonProps {
  handleSubmit: () => void;
  disabled: boolean;
}

export default function BottomButton({
  handleSubmit,
  disabled,
}: BottomButtonProps) {
  const { pageMode } = useContext(PageModeContext);

  return (
    <div className="sticky bottom-0 left-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
      <Button
        onClick={handleSubmit}
        disabled={disabled}
        variant="black"
        fullWidth
      >
        {pageMode === 'create' && '이벤트 생성하기'}
        {pageMode === 'edit' && '이벤트 수정하기'}
      </Button>
    </div>
  );
}
