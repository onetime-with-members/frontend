import { useParams } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop';
import BottomButtonForMobile from './BottomButtonForMobile';

interface BottomButtonGroupProps {
  setIsLoginAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomButtonGroup({
  setIsLoginAlertOpen,
}: BottomButtonGroupProps) {
  const params = useParams<{ eventId: string }>();

  function handleFloatingButtonClick() {
    if (localStorage.getItem('access-token')) {
      window.location.href = `/events/${params.eventId}/schedules/new`;
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  return (
    <>
      <BottomButtonForMobile
        handleFloatingButtonClick={handleFloatingButtonClick}
      />
      <BottomButtonForDesktop
        handleFloatingButtonClick={handleFloatingButtonClick}
      />
    </>
  );
}
