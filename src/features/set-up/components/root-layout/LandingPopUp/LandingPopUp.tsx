import { setCookie } from 'cookies-next';
import { useState } from 'react';

import dayjs from '@/lib/dayjs';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';

export default function LandingPopUp({
  initialIsShown,
}: {
  initialIsShown: boolean;
}) {
  const [isShown, setIsShown] = useState(initialIsShown);

  function handleCloseButtonClick() {
    setCookie('landing-pop-up', 'false', {
      expires: dayjs().add(1, 'day').hour(0).minute(0).second(0).toDate(),
    });
    setIsShown(false);
  }

  return (
    isShown && (
      <div className="fixed left-0 top-0 z-[99] flex h-full w-full flex-col items-center justify-center gap-6 bg-gray-90 bg-opacity-50">
        <div className="h-[25rem] w-full max-w-[20rem] overflow-hidden rounded-3xl bg-gray-00">
          <Image
            src="/images/sample-landing-pop-up.png"
            alt="샘플 랜딩 팝업 이미지"
            width={384}
            height={480}
            className="h-full object-cover"
          />
        </div>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-30"
          onClick={handleCloseButtonClick}
        >
          <IconX size={28} className="text-gray-00" />
        </button>
      </div>
    )
  );
}
