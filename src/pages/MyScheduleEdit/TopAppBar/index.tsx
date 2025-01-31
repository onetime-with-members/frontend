import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarProps {
  onBackButtonClick: () => void;
  onSubmitButtonClick: () => void;
}

export default function TopAppBar({
  onBackButtonClick,
  onSubmitButtonClick,
}: TopAppBarProps) {
  return (
    <nav className="h-[64px]">
      <div className="fixed z-10 flex h-[4rem] w-full justify-center bg-gray-00 px-4">
        <div className="mx-auto grid w-full max-w-screen-sm grid-cols-3">
          <div className="flex items-center justify-start">
            <button onClick={onBackButtonClick}>
              <IconChevronLeft size={24} />
            </button>
          </div>
          <div className="flex items-center justify-center text-gray-90 text-lg-300">
            스케줄 입력
          </div>
          <div className="flex items-center justify-end">
            <button
              className="rounded-lg bg-primary-00 px-3 py-1.5 text-primary-40 text-sm-200"
              onClick={onSubmitButtonClick}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
