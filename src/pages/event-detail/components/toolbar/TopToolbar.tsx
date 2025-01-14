import { useNavigate, useParams } from 'react-router-dom';

import kakaoIcon from '../../../../assets/kakao-icon.svg';
import sendIcon from '../../../../assets/send.svg';
import PenIcon from '../../../../components/icon/PenIcon';
import useKakaoShare from '../../../../hooks/useKakaoShare';
import { EventType } from '../../../../types/event.type';
import ToolbarButton from './ToolbarButton';
import ToolbarMenuDropdown from './ToolbarMenuDropdown';
import { IconTrashXFilled } from '@tabler/icons-react';

interface TopToolbarProps {
  event: EventType;
  isEventPending: boolean;
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleShareButtonClick: () => void;
}

export default function TopToolbar({
  event,
  isEventPending,
  setIsDeleteAlertOpen,
  handleShareButtonClick,
}: TopToolbarProps) {
  const params = useParams<{ eventId: string }>();
  const navigate = useNavigate();

  const { handleKakaoShare } = useKakaoShare({
    event,
    eventId: params.eventId,
  });

  function handleEditButtonClick() {
    navigate(`/events/${params.eventId}/edit`);
  }

  function handleDeleteButtonClick() {
    setIsDeleteAlertOpen(true);
  }

  return (
    <div className="mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-80 px-6 py-4 md:rounded-t-3xl">
      <header className="flex items-center justify-between md:h-10">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
          {event?.title || <>&nbsp;</>}
        </h1>
        {!isEventPending && event && (
          <>
            {event.event_status === 'CREATOR' && (
              <div className="flex items-center justify-center md:hidden">
                <ToolbarMenuDropdown
                  handleDeleteButtonClick={handleDeleteButtonClick}
                />
              </div>
            )}
            <div className="hidden items-center gap-2 md:flex">
              <ToolbarButton variant="primary" onClick={handleShareButtonClick}>
                <img src={sendIcon} alt="보내기 아이콘" />
              </ToolbarButton>
              <ToolbarButton variant="yellow" onClick={handleKakaoShare}>
                <img src={kakaoIcon} alt="카카오톡 아이콘" />
              </ToolbarButton>
              {event.event_status === 'CREATOR' && (
                <>
                  <ToolbarButton variant="gray" onClick={handleEditButtonClick}>
                    <PenIcon />
                  </ToolbarButton>
                  <ToolbarButton
                    variant="danger"
                    onClick={handleDeleteButtonClick}
                  >
                    <IconTrashXFilled />
                  </ToolbarButton>
                </>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  );
}
