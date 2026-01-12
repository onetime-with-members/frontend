import { IconChevronLeft } from '@tabler/icons-react';

export default function TopAppBarForMobile({
  pageTitle,
  onClose,
}: {
  pageTitle: string;
  onClose: () => void;
}) {
  return (
    <nav className="block h-[4rem] md:hidden">
      <div className="fixed left-0 top-0 flex h-[4rem] w-full items-center bg-gray-00 p-4">
        <button className="w-6" onClick={onClose}>
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
