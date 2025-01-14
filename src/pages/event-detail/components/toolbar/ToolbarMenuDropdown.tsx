import { useRef } from 'react';
import { useParams } from 'react-router-dom';

import useDropdown from '../../../../hooks/useDropdown';
import ToolbarMenuItem from './ToolbarMenuItem';
import { IconDots } from '@tabler/icons-react';

interface ToolbarMenuDropdownProps {
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToolbarMenuDropdown({
  setIsDeleteAlertOpen,
}: ToolbarMenuDropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const params = useParams<{ eventId: string }>();

  const { isMenuOpen, setIsMenuOpen, handleDropdownClick } = useDropdown({
    menuRef,
  });

  function handleDeleteButtonClick() {
    setIsMenuOpen(false);
    setIsDeleteAlertOpen(true);
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
              onClick={handleDeleteButtonClick}
            />
          </ul>
        </div>
      )}
    </div>
  );
}
