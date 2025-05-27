import cn from '@/lib/cn';
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
      <div className="fixed left-0 top-0 flex h-[4rem] w-full items-center bg-gray-00 p-4">
        <button className="w-6" onClick={handleBackButtonClick}>
          <IconChevronLeft />
        </button>
        <div className="flex flex-1 items-center justify-center">
          <span className="text-gray-90 text-md-300">{pageTitle}</span>
        </div>
        <div className="w-6" />
      </div>
    </nav>
  );
}
