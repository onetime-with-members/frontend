import BottomButtonForDesktop from './BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile';
import cn from '@/utils/cn';

interface ScreenLayoutProps {
  children: React.ReactNode;
  isVisible: boolean;
  title: React.ReactNode;
  disabled: boolean;
  handleNextButtonClick: () => void;
}

export default function ScreenLayout({
  isVisible,
  children,
  title,
  disabled,
  handleNextButtonClick,
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
        <>{children}</>
        <>
          <BottomButtonForMobile
            disabled={disabled}
            handleNextButtonClick={handleNextButtonClick}
          />
          <BottomButtonForDesktop
            disabled={disabled}
            handleNextButtonClick={handleNextButtonClick}
          />
        </>
      </div>
    </section>
  );
}
