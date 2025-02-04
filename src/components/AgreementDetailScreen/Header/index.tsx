import { IconChevronLeft } from '@tabler/icons-react';

interface HeaderProps {
  title: string;
  handlePageDetailClose: () => void;
}

export default function Header({ title, handlePageDetailClose }: HeaderProps) {
  return (
    <div className="hidden items-center py-6 md:flex">
      <button onClick={handlePageDetailClose}>
        <IconChevronLeft size={32} />
      </button>
      <h1 className="text-gray-90 title-lg-300">{title}</h1>
    </div>
  );
}
