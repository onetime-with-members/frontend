import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import QRCodeScreen from './QRCodeScreen';
import ShareBlueButton from './ShareBlueButton';
import ShareButtonWrapper from './ShareButtonWrapper';
import ShareKakaoButton from './ShareKakaoButton';
import ShareMoreButton from './ShareMoreButton';
import Input from '@/components/Input';
import useToast from '@/hooks/useToast';
import { shortenUrlQueryOptions } from '@/lib/api/query-options';
import { IconLink, IconQrcode, IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

export default function SharePopUp({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isQrCodeScreenOpen, setIsQrCodeScreenOpen] = useState(false);

  const urlInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const t = useTranslations('sharePopUp');
  const tToast = useTranslations('toast');

  const { data: shortenUrl } = useQuery({
    ...shortenUrlQueryOptions(window.location.href),
  });

  function handleCopyLink() {
    navigator.clipboard.writeText(shortenUrl || '');
    if (urlInputRef.current) {
      urlInputRef.current.select();
    }
    toast(tToast('copiedLink'));
  }

  return createPortal(
    <>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="flex w-full max-w-[35rem] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 pb-3 pt-4">
            <h2 className="text-gray-80 text-lg-300">{t('share')}</h2>
            <button className="text-gray-40" onClick={() => setIsOpen(false)}>
              <IconX size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-5 pb-8 pt-4">
            <div className="flex flex-col gap-3">
              <Input
                inputRef={urlInputRef}
                value={shortenUrl}
                className="overflow-hidden text-sm-100"
                inputClassName="pr-0"
                inputMode="none"
                readOnly
              />
            </div>
            <div className="flex items-center justify-center gap-4 xs:gap-6 sm:gap-8">
              <ShareButtonWrapper label={t('copyLink')}>
                <ShareBlueButton onClick={handleCopyLink}>
                  <IconLink size={24} />
                </ShareBlueButton>
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('qrCode')}>
                <ShareBlueButton onClick={() => setIsQrCodeScreenOpen(true)}>
                  <IconQrcode size={24} />
                </ShareBlueButton>
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('kakao')}>
                <ShareKakaoButton />
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('more')}>
                <ShareMoreButton />
              </ShareButtonWrapper>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isQrCodeScreenOpen && (
          <QRCodeScreen onClose={() => setIsQrCodeScreenOpen(false)} />
        )}
      </AnimatePresence>
    </>,
    document.getElementById('pop-up') as HTMLElement,
  );
}
