import { IconChevronLeft } from '@tabler/icons-react';

interface TopHeaderForDesktopProps {
  handleBackButtonClick: () => void;
}

export default function TopHeaderForDesktop({
  handleBackButtonClick,
}: TopHeaderForDesktopProps) {
  return (
    <header className="mx-auto hidden max-w-screen-md items-center py-8 md:flex">
      <button onClick={handleBackButtonClick}>
        <IconChevronLeft size={32} />
      </button>
      <h1 className="text-gray-90 title-lg-300">스케줄 입력</h1>
    </header>
  );
}
