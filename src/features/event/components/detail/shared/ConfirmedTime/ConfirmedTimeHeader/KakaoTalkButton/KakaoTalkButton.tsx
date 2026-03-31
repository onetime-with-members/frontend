import { useState } from 'react';

import TalkCalendarShareModal from '../../../TalkCalendarShareModal';
import ActionButton from '../ActionButton';
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
      <ActionButton
        className="flex h-9 w-full flex-row items-center justify-center gap-1 rounded-lg bg-[#FAE100] pl-[10px] pr-3 text-gray-90"
        onClick={handleModalOpen}
      >
        <KakaoTalkIcon fontSize={24} innerfill="" />
        <span className="text-gray-90 text-sm-200"> 공유하기</span>
      </ActionButton>
      {isModalOpen && <TalkCalendarShareModal onClose={handleModalClose} />}
    </>
  );
}
