import { useState } from 'react';

import PickerPanel from './PickerPanel';
import PickerTrigger from './PickerTrigger';

export default function ConfirmedTimePicker({
  type,
  isOpen,
  setIsOpen,
}: {
  type: 'start' | 'end';
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: '',
    time: '',
  });
  const [prevSelectedDateTime, setPrevSelectedDateTime] = useState({
    date: '',
    time: '',
  });

  function handleTriggerClick() {
    setIsOpen(!isOpen);
  }

  function handlePanelConfirm() {
    setPrevSelectedDateTime(selectedDateTime);
    setIsOpen(false);
  }

  function handlePanelClose() {
    setSelectedDateTime(prevSelectedDateTime);
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
