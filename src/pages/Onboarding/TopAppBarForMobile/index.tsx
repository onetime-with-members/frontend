import cn from '@/utils/cn';
import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarForMobileProps {
  pageTitle?: string;
  handleBackButtonClick: () => void;
  className?: string;
}

export default function TopAppBarForMobile({
  pageTitle,
  handleBackButtonClick,
  className,
}: TopAppBarForMobileProps) {
  return (
    <nav className={cn('block h-[4rem] md:hidden', className)}>
      <div className="fixed left-0 top-0 grid h-[4rem] w-full grid-cols-3 bg-gray-00 p-4">
        <button onClick={handleBackButtonClick}>
          <IconChevronLeft />
        </button>
        <div className="flex items-center justify-center">
          <span className="text-gray-90 text-md-300">{pageTitle}</span>
        </div>
        <div />
      </div>
    </nav>
  );
}
