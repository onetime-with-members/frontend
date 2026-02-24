import PickerPanel from './PickerPanel';
import PickerTrigger from './PickerTrigger';
import { SelectedDateTime } from '@/features/event/types';

export default function ConfirmedTimePicker({
  type,
  isOpen,
  setIsOpen,
  selectedDateTime,
  setSelectedDateTime,
  finalDateTime,
  setFinalDateTime,
}: {
  type: 'start' | 'end';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDateTime: SelectedDateTime['start' | 'end'];
  setSelectedDateTime: (dateTime: SelectedDateTime['start' | 'end']) => void;
  finalDateTime: SelectedDateTime['start' | 'end'];
  setFinalDateTime: (dateTime: SelectedDateTime['start' | 'end']) => void;
}) {
  function handleTriggerClick() {
    setIsOpen(!isOpen);
  }

  function handlePanelConfirm() {
    setFinalDateTime(selectedDateTime);
    setIsOpen(false);
  }

  function handlePanelClose() {
    setSelectedDateTime(finalDateTime);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <PickerTrigger
        type={type}
        selectedDateTime={selectedDateTime}
        active={isOpen}
        onClick={handleTriggerClick}
      />
      {isOpen && (
        <PickerPanel
          type={type}
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
          onConfirm={handlePanelConfirm}
          onCancel={handlePanelClose}
        />
      )}
    </div>
  );
}
