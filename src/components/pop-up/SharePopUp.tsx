import { useEffect, useRef, useState } from 'react';

import axios from '../../api/axios';
import { EventType } from '../../types/event.type';
import Input from '../form-control/input/Input';
import ShareButtonWrapper from '../share-button/ShareButtonWrapper';
import ShareKakaoButton from '../share-button/ShareKakaoButton';
import ShareMoreButton from '../share-button/ShareMoreButton';
import { IconLink, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';

interface SharePopUpProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  event: EventType;
}

export default function SharePopUp({ event, setIsOpen }: SharePopUpProps) {
  const [currentUrl, setCurrentUrl] = useState('Loading...');

  const urlInputRef = useRef<HTMLInputElement>(null);

  const makeShortenUrl = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/urls/action-shorten', {
        original_url: window.location.href,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setCurrentUrl(data.payload.shorten_url);
    },
  });

  function handleCopyLinkButtonClick() {
    navigator.clipboard.writeText(currentUrl);
    urlInputRef.current?.select();
    alert('링크가 복사되었습니다.');
  }

  function handleSharePopUpClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    makeShortenUrl.mutate();
  }, [event]);

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-8"
      onClick={handleSharePopUpClose}
    >
      <div
        className="flex w-full max-w-[35rem] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-gray-80 text-lg-300">공유하기</h2>
          <button className="text-gray-40" onClick={handleSharePopUpClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-5 pb-8 pt-4">
          <div className="flex flex-col gap-3">
            <Input
              inputRef={urlInputRef}
              value={currentUrl}
              className="text-sm-100"
              inputMode="none"
              readOnly
            />
          </div>
          <div className="flex items-center justify-center gap-8">
            <ShareButtonWrapper label="링크 복사">
              <button
                className="rounded-full bg-primary-00 p-3 text-primary-40"
                onClick={handleCopyLinkButtonClick}
              >
                <IconLink size={24} />
              </button>
            </ShareButtonWrapper>
            <ShareButtonWrapper label="카카오톡">
              <ShareKakaoButton event={event} />
            </ShareButtonWrapper>
            <ShareButtonWrapper label="더보기">
              <ShareMoreButton event={event} currentUrl={currentUrl} />
            </ShareButtonWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
