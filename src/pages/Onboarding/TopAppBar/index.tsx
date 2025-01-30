import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarProps {
  pageTitle?: string;
  handleBackButtonClick: () => void;
}

export default function TopAppBar({
  pageTitle,
  handleBackButtonClick,
}: TopAppBarProps) {
  return (
    <header className="h-[4rem]">
      <div className="fixed left-0 top-0 grid h-[4rem] w-full grid-cols-3 bg-gray-00 p-4">
        <button onClick={handleBackButtonClick}>
          <IconChevronLeft />
        </button>
        <div className="flex items-center justify-center">
          <span className="text-gray-90 text-md-300">{pageTitle}</span>
        </div>
        <div />
      </div>
    </header>
  );
}
