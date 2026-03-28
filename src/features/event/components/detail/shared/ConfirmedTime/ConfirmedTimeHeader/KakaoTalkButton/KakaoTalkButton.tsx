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
      <ActionButton
        className="bg-[#FAE100] text-gray-90 flex flex-row items-center gap-1 pl-[10px] h-9 pr-3 rounded-lg w-full justify-center"
        onClick={handleModalOpen}
      >
        <KakaoTalkIcon fontSize={24} innerfill="" />
        <span className='text-sm-200 text-gray-90'> 공유하기</span>
      </ActionButton>
      {isModalOpen && <TalkCalendarShareModal onClose={handleModalClose} />}
    </>
  );
}
