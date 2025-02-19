import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import ToolbarButton from '../ToolbarButton/ToolbarButton';
import ToolbarMenuItem from './ToolbarMenuItem/ToolbarMenuItem';
import useDropdown from '@/hooks/useDropdown';
import { IconDots } from '@tabler/icons-react';

interface ToolbarMenuDropdownProps {
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToolbarMenuDropdown({
  setIsDeleteAlertOpen,
}: ToolbarMenuDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownMenuOpen, setIsDropdownMenuOpen, handleDropdownClick } =
    useDropdown({
      dropdownRef,
    });

  const params = useParams<{ eventId: string }>();
  const { t } = useTranslation();

  function handleDeleteMenuItemClick() {
    setIsDropdownMenuOpen(false);
    setIsDeleteAlertOpen(true);
  }

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
    >
      <ToolbarButton
        variant="gray"
        onClick={handleDropdownClick}
        className="hidden md:flex"
      >
        <IconDots size={28} />
      </ToolbarButton>
      <button className="text-gray-00 md:hidden" onClick={handleDropdownClick}>
        <IconDots size={28} />
      </button>
      {isDropdownMenuOpen && (
        <div className="absolute right-0 top-8 z-30 w-[5.5rem] overflow-hidden rounded-xl bg-gray-00 py-1 shadow-lg md:top-12">
          <ul className="flex flex-col">
            <ToolbarMenuItem
              name={t('eventDetail.edit')}
              icon="edit"
              variant="default"
              href={`/events/${params.eventId}/edit`}
            />
            <ToolbarMenuItem
              name={t('eventDetail.delete')}
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
