import PickerPanel from './PickerPanel';
import PickerTrigger from './PickerTrigger';
import { SelectedDateTime } from '@/features/event/types';

export interface ConfirmedTimePickerProps {
  type: 'start' | 'end';
  datePickerType: 'date' | 'day';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDateTime: SelectedDateTime['start' | 'end'];
  setSelectedDateTime: (dateTime: SelectedDateTime['start' | 'end']) => void;
  finalDateTime: SelectedDateTime['start' | 'end'];
  setFinalDateTime: (dateTime: SelectedDateTime['start' | 'end']) => void;
}

export default function ConfirmedTimePicker({
  type,
  datePickerType,
  isOpen,
  setIsOpen,
  selectedDateTime,
  setSelectedDateTime,
  finalDateTime,
  setFinalDateTime,
}: ConfirmedTimePickerProps) {
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
        datePickerType={datePickerType}
        active={isOpen}
        onClick={handleTriggerClick}
        selectedDateTime={selectedDateTime}
      />
      {isOpen && (
        <PickerPanel
          type={type}
          datePickerType={datePickerType}
          onConfirm={handlePanelConfirm}
          onCancel={handlePanelClose}
          selectedDateTime={selectedDateTime}
          setSelectedDateTime={setSelectedDateTime}
        />
      )}
    </div>
  );
}
