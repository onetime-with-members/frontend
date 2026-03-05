import { useState } from 'react';

import SharePopUp from '../../../SharePopUp';
import ActionButton from '../ActionButton';
import { ShareIcon } from '@/components/icon';

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  return (
    <>
      <ActionButton onClick={handleOpen}>
        <ShareIcon />
      </ActionButton>
      {isOpen && <SharePopUp setIsOpen={setIsOpen} />}
    </>
  );
}
