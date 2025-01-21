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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  const params = useParams<{ eventId: string }>();

  function handleDeleteMenuItemClick() {
    setIsDropdownMenuOpen(false);
    handleDeleteButtonClick();
  }

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      <button className="text-gray-00" onClick={handleDropdownClick}>
        <IconDots size={28} />
      </button>
      {isDropdownMenuOpen && (
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
