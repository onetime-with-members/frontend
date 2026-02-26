import { useEffect, useState } from 'react';

import ConfirmedTimePickerButton from '../../shared/ConfirmedTimePickerButton';
import PickerPanel from './PickerPanel';
import {
  useConfirmedTime,
  useConfirmedTimeDispatch,
} from '@/features/event/contexts/ConfirmedTimeContext';

export interface ConfirmedTimePickerProps {
  type: 'start' | 'end';
  datePickerType: 'date' | 'day';
  isOpen: boolean;
  onOpen: (isOpen: boolean) => void;
}

export default function ConfirmedTimePicker({
  type,
  datePickerType,
  isOpen,
  onOpen,
}: ConfirmedTimePickerProps) {
  const confirmedTime = useConfirmedTime();
  const dispatch = useConfirmedTimeDispatch();

  const [selectedDateTime, setSelectedDateTime] = useState<{
    date: string;
    time: string;
  }>(confirmedTime[type]);

  function handleTriggerClick() {
    onOpen(!isOpen);
  }

  function handlePanelConfirm() {
    if (!dispatch) return;
    if (type === 'start') {
      dispatch({ type: 'start_picker_selected', ...selectedDateTime });
    } else {
      dispatch({ type: 'end_picker_selected', ...selectedDateTime });
    }
    onOpen(false);
  }

  function handlePanelClose() {
    setSelectedDateTime(confirmedTime[type]);
    onOpen(false);
  }

  useEffect(() => {
    setSelectedDateTime(confirmedTime[type]);
  }, [confirmedTime[type]]);

  return (
    <div className="relative">
      <ConfirmedTimePickerButton
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
