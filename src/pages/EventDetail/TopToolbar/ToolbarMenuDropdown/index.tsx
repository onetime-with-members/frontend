import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import ToolbarMenuItem from './ToolbarMenuItem';
import useDropdown from '@/hooks/useDropdown';
import { IconDots } from '@tabler/icons-react';

interface ToolbarMenuDropdownProps {
  handleDeleteButtonClick: () => void;
}

export default function ToolbarMenuDropdown({
  handleDeleteButtonClick,
}: ToolbarMenuDropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const params = useParams<{ eventId: string }>();

  const { isMenuOpen, setIsMenuOpen, handleDropdownClick } = useDropdown({
    menuRef,
  });

  function handleDeleteMenuItemClick() {
    setIsMenuOpen(false);
    handleDeleteButtonClick();
  }

  return (
    <div className="relative flex items-center justify-center" ref={menuRef}>
      <button className="text-gray-00" onClick={handleDropdownClick}>
        <IconDots size={28} />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 top-8 z-30 w-[5.5rem] overflow-hidden rounded-lg bg-gray-00 shadow-lg">
          <ul className="flex flex-col gap-1">
            <ToolbarMenuItem
              name="수정"
              icon="edit"
              variant="default"
              href={`/events/${params.eventId}/edit`}
            />
            <ToolbarMenuItem
              name="삭제"
              icon="delete"
              variant="danger"
              onClick={handleDeleteMenuItemClick}
            />
          </ul>
        </div>
      )}
    </div>
  );
}
