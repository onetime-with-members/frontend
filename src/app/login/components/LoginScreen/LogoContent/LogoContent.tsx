import { useTranslations } from 'next-intl';

import Image from 'next/image';

export default function LogoContent() {
  const t = useTranslations('login');

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-primary-50 title-md-200">{t('logoTitle')}</div>
      <div>
        <Image
          src="/images/logo-auth.svg"
          alt="로그인 원타임 로고"
          width={256}
          height={52}
          className="w-[16rem] object-cover"
        />
      </div>
    </div>
  );
}
