import { useLocale, useTranslations } from 'next-intl';

import SpeechBalloon from '../../../shared/SpeechBalloon';
import { eventQueryOptions } from '@/features/event/api/events.option';
import { schedulesQueryOptions } from '@/lib/api/query-options';
import { defaultEvent } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function SendButton({ onClick }: { onClick: () => void }) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');
  const locale = useLocale();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  return (
    <SpeechBalloon.Container>
      <SpeechBalloon.Wrapper>
        <button
          type="button"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-80"
          onClick={onClick}
        >
          <Image
            src="/images/send.svg"
            alt="종이비행기 아이콘"
            width={36}
            height={36}
          />
        </button>
      </SpeechBalloon.Wrapper>
      {schedules?.length === 0 && (
        <SpeechBalloon.Main width={locale === 'ko' ? 101 : 111} offset={2}>
          {t('shareMessage')}
        </SpeechBalloon.Main>
      )}
    </SpeechBalloon.Container>
  );
}
