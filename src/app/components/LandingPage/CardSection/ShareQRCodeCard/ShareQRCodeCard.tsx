import { useTranslations } from 'next-intl';

import Card from '../Card/Card';
import ClockPattern from '@/components/clock-pattern';
import Image from 'next/image';

export default function ShareQRCodeCard() {
  const t = useTranslations('landing');

  return (
    <Card
      title={t.rich('title.card2', {
        br: () => <br className="hidden min-[350px]:block" />,
      })}
      badgeTitle={t('badge.card2')}
      description={t.rich('description.card2', {
        br: () => <br className="hidden min-[350px]:block" />,
      })}
      image={
        <div className="h-[260px]">
          <div className="absolute bottom-0 left-0 pr-4">
            <Image
              src="/images/landing/paper-airplane.svg"
              alt="날아가는 종이 비행기 이미지"
              width={273}
              height={284}
            />
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
