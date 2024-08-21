import clsx from 'clsx';
import { useEffect, useState } from 'react';

import clipboardImage from '../assets/clipboard.png';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface EmptyEventBannerProps {
  copyEventShareLink: () => void;
}

export default function EmptyEventBanner({
  copyEventShareLink,
}: EmptyEventBannerProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyButtonClick = () => {
    copyEventShareLink();
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const copyTimeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => {
        clearTimeout(copyTimeout);
      };
    }
  }, [isCopied]);

  return (
    <div className="relative mt-4 overflow-hidden rounded-2xl bg-gray-00 px-6 py-5">
      <span className="text-lg-300 leading-6 text-primary-50">
        링크를 공유하고
        <br />
        맞는 시간을 찾으세요!
      </span>
      <button
        className={clsx(
          'text-sm-300 mt-3 flex items-center gap-1 rounded-full px-3 py-2',
          {
            'bg-primary-40 text-gray-00': isCopied,
            'bg-primary-00 text-primary-50': !isCopied,
          },
        )}
        onClick={handleCopyButtonClick}
      >
        <span>{isCopied ? '복사 완료' : '링크 복사'}</span>
        <span>
          {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
        </span>
      </button>
      <div className="absolute -bottom-12 right-0 w-[10rem] min-[400px]:-bottom-16 min-[400px]:w-[12rem]">
        <img
          src={clipboardImage}
          alt="클립보드 이미지"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
