'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { eventQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function EmptyEventBanner({
  className,
}: {
  className?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

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
    <div
      className={cn(
        'relative mt-2 overflow-hidden rounded-2xl bg-primary-40 px-4 py-5',
        className,
      )}
    >
      <div className="relative z-10 flex flex-col items-start gap-3">
        <span className="leading-6 text-gray-00 text-lg-300 md:text-md-300">
          {t.rich('emptyEventBanner', {
            br: () => <br />,
          })}
        </span>
        <button
          className="flex items-center gap-1 rounded-full bg-primary-00 px-3 py-2 text-primary-50 text-sm-300"
          onClick={handleCopyButtonClick}
        >
          <span>{isCopied ? t('copied') : t('copyLink')}</span>
          <span>
            {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </span>
        </button>
      </div>
      <div className="absolute bottom-0 right-0 h-full -translate-x-2 xs:-translate-x-4">
        <Image
          src="/images/empty-event-banner.png"
          alt="클립보드 이미지"
          className="h-full w-full"
          width={170}
          height={133}
        />
      </div>
    </div>
  );
}
