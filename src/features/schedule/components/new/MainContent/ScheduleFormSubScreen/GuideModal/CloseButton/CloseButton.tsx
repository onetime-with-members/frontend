import { useContext } from 'react';

import { GuideModalContext } from '@/features/schedule/contexts/GuideModalContext';
import { IconX } from '@tabler/icons-react';

export default function CloseButton() {
  const { handleGuideModalClose } = useContext(GuideModalContext);

  return (
    <button
      className="absolute right-4 top-4 p-1.5 text-sm text-gray-00"
      onClick={handleGuideModalClose}
    >
      <IconX />
    </button>
  );
}
