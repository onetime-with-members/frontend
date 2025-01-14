import { useNavigate, useParams } from 'react-router-dom';

import kakaoIcon from '../../../../assets/kakao-icon.svg';
import sendIcon from '../../../../assets/send.svg';
import PenIcon from '../../../../components/icon/PenIcon';
import useKakaoShare from '../../../../hooks/useKakaoShare';
import { EventType } from '../../../../types/event.type';
import ToolbarButton from './ToolbarButton';
import ToolbarMenuDropdown from './ToolbarMenuDropdown';

interface TopToolbarProps {
  event: EventType;
  setIsSharePopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopToolbar({
  event,
  setIsSharePopUpOpen,
  setIsDeleteAlertOpen,
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

  function handleShareButtonClick() {
    setIsSharePopUpOpen(true);
  }

  return (
    <div className="mx-auto w-full max-w-[calc(768px+2rem)] bg-gray-80 px-6 py-4 md:rounded-t-3xl">
      <header className="flex items-center justify-between">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 text-lg-300 md:title-sm-300">
          {event.title}
        </h1>
        {event.event_status === 'CREATOR' && (
          <div className="flex items-center justify-center md:hidden">
            <ToolbarMenuDropdown setIsDeleteAlertOpen={setIsDeleteAlertOpen} />
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
            <ToolbarButton variant="gray" onClick={handleEditButtonClick}>
              <PenIcon />
            </ToolbarButton>
          )}
        </div>
      </header>
    </div>
  );
}
