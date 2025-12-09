import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/FloatingBottomButton';

export default function ScreenLayout({
  pageIndex,
  title,
  disabled = false,
  onBackButtonClick,
  onSubmit,
  children,
}: {
  pageIndex: number;
  title: React.ReactNode;
  disabled?: boolean;
  onBackButtonClick: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations('onboarding');

  return (
    <section className="flex flex-col gap-3">
      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        className="flex flex-col gap-14"
      >
        <h1 className="text-left text-gray-90 title-lg-300 md:text-center">
          {title}
        </h1>

        {children}

        {/* Bottom Button for Mobile */}
        <div className="block md:hidden">
          <FloatingBottomButton
            type="submit"
            variant="black"
            disabled={disabled}
            fullWidth
          >
            {t('next')}
          </FloatingBottomButton>
        </div>
        {/* Bottom Button for Desktop */}
        <div className="hidden flex-col gap-4 md:flex">
          <Button type="submit" disabled={disabled} variant="dark" fullWidth>
            {t('next')}
          </Button>
          <button
            type="button"
            className="text-gray-40 text-md-200"
            onClick={onBackButtonClick}
          >
            {pageIndex === 0 ? t('goBack') : t('previous')}
          </button>
        </div>
      </form>
    </section>
  );
}
