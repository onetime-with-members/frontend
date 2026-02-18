import { useState } from 'react';

import ActionButton from '../ActionButton';
import TalkCalendarShareModal from './TalkCalendarShareModal';
import { KakaoTalkIcon } from '@/components/icon';

export default function KakaoTalkButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <ActionButton className="bg-[#FAE100]" onClick={handleModalOpen}>
        <KakaoTalkIcon fontSize={24} innerfill="#FAE100" />
      </ActionButton>
      {isModalOpen && <TalkCalendarShareModal onClose={handleModalClose} />}
    </>
  );
}
