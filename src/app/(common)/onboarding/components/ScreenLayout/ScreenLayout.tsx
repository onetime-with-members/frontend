import BottomButtonForDesktop from './BottomButtonForDesktop/BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile/BottomButtonForMobile';
import cn from '@/lib/cn';

interface ScreenLayoutProps {
  isVisible: boolean;
  page: number;
  title: React.ReactNode;
  disabled?: boolean;
  handleNextButtonClick: () => void;
  handleBackButtonClick: () => void;
  children: React.ReactNode;
}

export default function ScreenLayout({
  isVisible,
  page,
  title,
  disabled = false,
  handleNextButtonClick,
  handleBackButtonClick,
  children,
}: ScreenLayoutProps) {
  return (
    <section
      className={cn('flex flex-col gap-3', {
        hidden: !isVisible,
      })}
    >
      <div className="flex flex-col gap-14">
        <h1 className="text-left text-gray-90 title-lg-300 md:text-center">
          {title}
        </h1>

        {children}

        <BottomButtonForMobile
          disabled={disabled}
          handleNextButtonClick={handleNextButtonClick}
        />
        <BottomButtonForDesktop
          disabled={disabled}
          handleNextButtonClick={handleNextButtonClick}
          handleBackButtonClick={handleBackButtonClick}
          page={page}
        />
      </div>
    </section>
  );
}
