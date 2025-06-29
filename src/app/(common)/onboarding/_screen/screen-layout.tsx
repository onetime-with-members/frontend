import { useTranslations } from 'next-intl';

import Button from '@/components/button';
import FloatingBottomButton from '@/components/button/floating-bottom-button';
import cn from '@/lib/cn';

export default function ScreenLayout({
  type = 'default',
  isVisible,
  page,
  title,
  disabled = false,
  onNextButtonClick,
  onBackButtonClick,
  onSubmit,
  children,
}: {
  type?: 'submit' | 'default';
  isVisible: boolean;
  page: number;
  title: React.ReactNode;
  disabled?: boolean;
  onNextButtonClick: () => void;
  onBackButtonClick: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) {
  const t = useTranslations('onboarding');

  return (
    <section
      className={cn('flex flex-col gap-3', {
        hidden: !isVisible,
      })}
    >
      <form
        onSubmit={type === 'submit' ? onSubmit : () => {}}
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
            type={type === 'submit' ? 'submit' : 'button'}
            variant="black"
            onClick={onNextButtonClick}
            disabled={disabled}
            fullWidth
          >
            {t('next')}
          </FloatingBottomButton>
        </div>
        {/* Bottom Button for Desktop */}
        <div className="hidden flex-col gap-4 md:flex">
          <Button
            type={type === 'submit' ? 'submit' : 'button'}
            onClick={onNextButtonClick}
            disabled={disabled}
            variant="dark"
            fullWidth
          >
            {t('next')}
          </Button>
          <button
            type="button"
            className="text-gray-40 text-md-200"
            onClick={onBackButtonClick}
          >
            {page === 1 ? t('goBack') : t('previous')}
          </button>
        </div>
      </form>
    </section>
  );
}
