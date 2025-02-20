import { Trans, useTranslation } from 'react-i18next';

import notFound404 from '@/assets/not-found-404.svg';

export default function MainContent() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-1 flex-col px-4">
      <div className="mx-auto flex w-full max-w-screen-md flex-1 items-center justify-center">
        <div className="flex -translate-y-20 flex-col items-center gap-10">
          <div>
            <img src={notFound404} alt="404" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-primary-50 title-sm-300">
              {t('404.title')}
            </h1>
            <p className="text-center text-gray-40 text-md-200">
              <Trans i18nKey="404.description">
                찾으시려는 페이지의 주소가 잘못되었거나{' '}
                <br className="hidden xs:block"></br>
                주소 변경, 삭제로 이용하실 수 없어요.{' '}
                <br className="hidden xs:block"></br>
                주소가 올바르게 입력되었는지 확인해주세요.
              </Trans>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
