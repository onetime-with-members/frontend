import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import emptyEventBannerImage from '@/assets/empty-event-banner.png';
import { useEventQuery } from '@/queries/event.queries';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export default function EmptyEventBanner() {
  const [isCopied, setIsCopied] = useState(false);

  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();

  const { data: event } = useEventQuery(params.eventId);

  const handleCopyButtonClick = () => {
    if (!event) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/events/${event.event_id}`,
    );
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
    <div className="relative mt-4 overflow-hidden rounded-2xl bg-primary-40 px-6 py-5">
      <div className="relative z-10 flex flex-col items-start gap-3">
        <span className="leading-6 text-gray-00 text-lg-300 md:text-md-300">
          <Trans i18nKey="eventDetail.emptyEventBanner">
            링크를 공유하고 <br />
            맞는 시간을 찾으세요!
          </Trans>
        </span>
        <button
          className="flex items-center gap-1 rounded-full bg-primary-00 px-3 py-2 text-primary-50 text-sm-300"
          onClick={handleCopyButtonClick}
        >
          <span>
            {isCopied ? t('eventDetail.copied') : t('eventDetail.copyLink')}
          </span>
          <span>
            {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </span>
        </button>
      </div>
      <div className="absolute right-0 top-0 h-full">
        <img
          src={emptyEventBannerImage}
          alt="클립보드 이미지"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
