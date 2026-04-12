import { useLocale, useTranslations } from 'next-intl';

import SpeechBalloon from '../../../../shared/SpeechBalloon';
import { CalendarIcon } from '@/components/icon';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ConfirmEventButton() {
  const params = useParams<{ id: string }>();
  const t = useTranslations('event.pages.EventDetailPage.confirm');
  const locale = useLocale();

  const progressRouter = useProgressRouter();

  async function handleClick() {
    progressRouter.push(`/events/${params.id}/confirm`);
  }

  return (
    <div className="hidden md:block">
      <SpeechBalloon.Container>
        <SpeechBalloon.Wrapper>
          <button
            className="flex h-8 items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-gray-00 text-sm-300"
            onClick={handleClick}
          >
            <span>
              <CalendarIcon innerfill="#4c65e5" fontSize={20} />
            </span>
            <span>{t('button')}</span>
          </button>
        </SpeechBalloon.Wrapper>
        <SpeechBalloon.Main
          width={locale === 'ko' ? 315 : 405}
          offset={2}
          vertical="bottom"
          horizontal="right"
          variant="secondary"
          triangleOffset={60}
        >
          {t('speechBalloon')}
        </SpeechBalloon.Main>
      </SpeechBalloon.Container>
    </div>
  );
}
