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
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [prevSelectedDate, setPrevSelectedDate] = useState('');
  const [prevSelectedTime, setPrevSelectedTime] = useState('');

  function handleTriggerClick() {
    setIsOpen(!isOpen);
  }

  function handlePanelConfirm() {
    setPrevSelectedDate(selectedDate);
    setPrevSelectedTime(selectedTime);
    setIsOpen(false);
  }

  function handlePanelClose() {
    setSelectedDate(prevSelectedDate);
    setSelectedTime(prevSelectedTime);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <PickerTrigger
        type={type}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        active={isOpen}
        onClick={handleTriggerClick}
      />
      {isOpen && (
        <PickerPanel
          type={type}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          onConfirm={handlePanelConfirm}
          onCancel={handlePanelClose}
        />
      )}
    </div>
  );
}
