import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ShareItemWrapper from '../ShareItemWrapper';
import ShareKakaoButton from '../ShareKakaoButton';
import {
  IconCheck,
  IconCopy,
  IconDots,
  IconLink,
  IconX,
} from '@tabler/icons-react';

interface SharePopUpProps {
  onClose: () => void;
}

export default function SharePopUp({ onClose }: SharePopUpProps) {
  const [isCopied, setIsCopied] = useState(false);

  const params = useParams<{ eventId: string }>();

  const currentUrl = `${window.location.origin}/events/${params.eventId}`;

  function copyEventShareLink() {
    navigator.clipboard.writeText(currentUrl);
  }

  function handleCopyLinkButtonClick() {
    copyEventShareLink();
    alert('링크가 복사되었습니다.');
  }

  function handleCopyLinkIconButtonClick() {
    copyEventShareLink();
    setIsCopied(true);
    // alert('링크가 복사되었습니다.');
    // setTimeout(() => {
    //   setIsCopied(false);
    // }, 3000);
  }

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex w-[23rem] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-lg-300 text-gray-80">공유하기</h2>
          <button className="text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-5 pb-8 pt-4">
          <div className="flex items-center gap-1 rounded-2xl bg-gray-05 px-5 py-4">
            <span className="text-md-200 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-50">
              {currentUrl}
            </span>
            {isCopied ? (
              <button className="text-primary-40">
                <IconCheck size={20} />
              </button>
            ) : (
              <button
                className="text-primary-40"
                onClick={handleCopyLinkIconButtonClick}
              >
                <IconCopy size={20} />
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-8">
            <ShareItemWrapper label="링크 복사">
              <button
                className="rounded-full bg-primary-00 p-3 text-primary-40"
                onClick={handleCopyLinkButtonClick}
              >
                <IconLink size={24} />
              </button>
            </ShareItemWrapper>
            <ShareItemWrapper label="카카오톡">
              <ShareKakaoButton />
            </ShareItemWrapper>
            <ShareItemWrapper label="더보기">
              <button className="rounded-full bg-gray-10 p-3 text-gray-40">
                <IconDots size={24} />
              </button>
            </ShareItemWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
