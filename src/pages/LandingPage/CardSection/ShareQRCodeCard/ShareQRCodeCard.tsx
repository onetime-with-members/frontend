import { Trans, useTranslation } from 'react-i18next';

import Card from '../Card/Card';
import cardImage from '@/assets/landing/paper-airplane.svg';
import ClockPattern from '@/components/ClockPattern/ClockPattern';

export default function ShareQRCodeCard() {
  const { t } = useTranslation();

  return (
    <Card
      title={
        <Trans i18nKey="landing.title.card2">
          오프라인에서는 QR코드로 <br className="hidden min-[350px]:block" />
          쉽고 빠른 일정관리
        </Trans>
      }
      badgeTitle={t('landing.badge.card2')}
      description={
        <Trans i18nKey="landing.description.card2">
          오프라인에서는 링크 공유 필요 없이{' '}
          <br className="hidden min-[350px]:block" />
          QR코드 하나로 시간을 조율해보세요.
        </Trans>
      }
      image={
        <div className="h-[260px]">
          <div className="absolute -left-4 bottom-0 pr-4">
            <img src={cardImage} alt="날아가는 종이 비행기 이미지" />
          </div>
        </div>
      }
      style={{
        background: 'linear-gradient(180deg, #8898F2 0%, #4C65E5 100%)',
      }}
      backgroundPattern={<ClockPattern className="opacity-50" />}
    />
  );
}
