import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import QRCodeScreen from './QRCodeScreen/QRCodeScreen';
import ShareBlueButton from './ShareBlueButton/ShareBlueButton';
import ShareButtonWrapper from './ShareButtonWrapper/ShareButtonWrapper';
import ShareKakaoButton from './ShareKakaoButton/ShareKakaoButton';
import ShareMoreButton from './ShareMoreButton/ShareMoreButton';
import Input from '@/components/Input/Input';
import { useEventQuery } from '@/queries/event.queries';
import { useToast } from '@/stores/toast';
import { IconLink, IconQrcode, IconX } from '@tabler/icons-react';

interface SharePopUpProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SharePopUp({ setIsOpen }: SharePopUpProps) {
  const [isQrCodeScreenOpen, setIsQrCodeScreenOpen] = useState(false);

  const urlInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();

  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();

  const { data: event } = useEventQuery(params.eventId);

  function handleCopyLinkButtonClick() {
    navigator.clipboard.writeText(event?.shortenUrl || '');
    if (urlInputRef.current) {
      urlInputRef.current.select();
    }
    toast(t('toast.copiedLink'));
  }

  function handleSharePopUpClose() {
    setIsOpen(false);
  }

  function handleQrCodeButtonClick() {
    setIsQrCodeScreenOpen(true);
  }

  function handleQrCodeScreenClose() {
    setIsQrCodeScreenOpen(false);
  }

  return (
    <>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
        onClick={handleSharePopUpClose}
      >
        <div
          className="flex w-full max-w-[35rem] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-5 pb-3 pt-4">
            <h2 className="text-gray-80 text-lg-300">
              {t('sharePopUp.share')}
            </h2>
            <button className="text-gray-40" onClick={handleSharePopUpClose}>
              <IconX size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-5 pb-8 pt-4">
            <div className="flex flex-col gap-3">
              <Input
                inputRef={urlInputRef}
                value={event?.shortenUrl || 'Loading...'}
                className="overflow-hidden text-sm-100"
                inputClassName="pr-0"
                inputMode="none"
                readOnly
              />
            </div>
            <div className="flex items-center justify-center gap-4 xs:gap-6 sm:gap-8">
              <ShareButtonWrapper label={t('sharePopUp.copyLink')}>
                <ShareBlueButton onClick={handleCopyLinkButtonClick}>
                  <IconLink size={24} />
                </ShareBlueButton>
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('sharePopUp.qrCode')}>
                <ShareBlueButton onClick={handleQrCodeButtonClick}>
                  <IconQrcode size={24} />
                </ShareBlueButton>
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('sharePopUp.kakao')}>
                <ShareKakaoButton />
              </ShareButtonWrapper>
              <ShareButtonWrapper label={t('sharePopUp.more')}>
                <ShareMoreButton />
              </ShareButtonWrapper>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isQrCodeScreenOpen && (
          <QRCodeScreen onClose={handleQrCodeScreenClose} />
        )}
      </AnimatePresence>
    </>
  );
}
