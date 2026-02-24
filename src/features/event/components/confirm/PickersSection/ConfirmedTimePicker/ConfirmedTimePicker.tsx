import { useContext } from 'react';

import PickerPanel from './PickerPanel';
import PickerTrigger from './PickerTrigger';
import { SelectedDateTimeContext } from '@/features/event/contexts/SelectedDateTimeContext';

export default function ConfirmedTimePicker({
  type,
  isOpen,
  setIsOpen,
}: {
  type: 'start' | 'end';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const {
    selectedDateTime,
    setSelectedDateTime,
    finalDateTime,
    setFinalDateTime,
  } = useContext(SelectedDateTimeContext);

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
      <PickerTrigger type={type} active={isOpen} onClick={handleTriggerClick} />
      {isOpen && (
        <PickerPanel
          type={type}
          onConfirm={handlePanelConfirm}
          onCancel={handlePanelClose}
        />
      )}
    </div>
  );
}
