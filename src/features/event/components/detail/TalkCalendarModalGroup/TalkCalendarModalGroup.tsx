import TalkCalendarShareModal from '../shared/TalkCalendarShareModal';
import TalkCalendarSuccessModal from './TalkCalendarSuccessModal';
import useTalkCalendarComplete from '@/features/event/hooks/useTalkCalendarComplete';
import useTalkCalendarShareModal from '@/features/event/hooks/useTalkCalendarShareModal';

export default function TalkCalendarModalGroup() {
  const {
    isModalOpen: isShareModalOpen,
    handleModalClose: handleShareModalClose,
  } = useTalkCalendarShareModal();
  const {
    isModalOpen: isSuccessModalOpen,
    handleModalClose: handleSuccessModalClose,
  } = useTalkCalendarComplete();

  return (
    <>
      {isShareModalOpen && (
        <TalkCalendarShareModal onClose={handleShareModalClose} />
      )}
      {isSuccessModalOpen && (
        <TalkCalendarSuccessModal onClose={handleSuccessModalClose} />
      )}
    </>
  );
}
