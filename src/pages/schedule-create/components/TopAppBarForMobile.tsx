import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarForMobileProps {
  pageIndex: number;
  handleBackButtonClick: () => void;
  setIsTopSubmitButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopAppBarForMobile({
  pageIndex,
  handleBackButtonClick,
  setIsTopSubmitButtonClicked,
}: TopAppBarForMobileProps) {
  function handleSubmitButtonClick() {
    setIsTopSubmitButtonClicked(true);
  }

  return (
    <header className="block h-[67px] md:hidden">
      <div className="fixed left-0 top-0 z-50 w-full bg-white px-4">
        <div className="mx-auto grid max-w-screen-md grid-cols-3 py-5">
          <div className="flex items-center">
            <button onClick={handleBackButtonClick}>
              <IconChevronLeft size={24} className="text-gray-80" />
            </button>
          </div>
          <h2 className="text-center text-gray-90 text-lg-300">스케줄 입력</h2>
          {pageIndex === 1 && (
            <div className="flex items-center justify-end">
              <button
                className="rounded-lg bg-primary-00 px-3 py-1.5 text-primary-50 text-sm-200"
                onClick={handleSubmitButtonClick}
              >
                완료
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
