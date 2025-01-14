import { useNavigate, useParams } from 'react-router-dom';

import kakaoIcon from '../../../../assets/kakao-icon.svg';
import sendIcon from '../../../../assets/send.svg';
import PenIcon from '../../../../components/icon/PenIcon';
import useKakaoShare from '../../../../hooks/useKakaoShare';
import { EventType } from '../../../../types/event.type';
import ToolbarButton from './ToolbarButton';

interface TopToolbarProps {
  event: EventType;
  setIsSharePopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TopToolbar({
  event,
  setIsSharePopUpOpen,
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
    <div className="mx-auto w-full max-w-[calc(768px+2rem)] rounded-t-3xl bg-gray-80 px-4 py-4">
      <header className="flex items-center justify-between">
        <h1 className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-00 title-sm-300">
          {event.title}
        </h1>
        <div className="flex items-center gap-2">
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
