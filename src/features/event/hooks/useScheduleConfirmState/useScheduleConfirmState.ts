import { useContext, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';

import { useEventQuery } from '@/features/event/api/event.query';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import { RecommendedScheduleType } from '@/features/event/types';
import dayjs, { Dayjs } from '@/lib/dayjs';

export default function useScheduleConfirmState() {
  const params = useParams<{ id: string }>();
  const { data: event } = useEventQuery(params.id);
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('14:00');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<'start' | 'end' | null>(
    'start',
  );

  const calendarRanges = useMemo(() => {
    if (!selectedStartDate && !selectedEndDate) return [];
    if (selectedStartDate && !selectedEndDate)
      return [selectedStartDate.format('YYYY.MM.DD')];
    if (!selectedStartDate && selectedEndDate)
      return [selectedEndDate.format('YYYY.MM.DD')];
    const a = selectedStartDate!.format('YYYY.MM.DD');
    const b = selectedEndDate!.format('YYYY.MM.DD');
    return a <= b ? [a, b] : [b, a];
  }, [selectedStartDate, selectedEndDate]);

  function setCalendarRanges(ranges: string[]) {
    const sorted = [...ranges].sort();
    if (sorted.length === 0) {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    } else if (sorted.length === 1) {
      const d = dayjs(sorted[0], 'YYYY.MM.DD');
      setSelectedStartDate(d);
      setSelectedEndDate(d);
    } else {
      setSelectedStartDate(dayjs(sorted[0], 'YYYY.MM.DD'));
      setSelectedEndDate(dayjs(sorted[sorted.length - 1], 'YYYY.MM.DD'));
    }
    setSelectedSlotIndex(null);
  }

  const hasSelection =
    selectedStartDate && selectedEndDate && startTime && endTime;
  const isConfirmDisabled = !hasSelection;

  function handleSelectRecommended(slot: RecommendedScheduleType, index: number) {
    setSelectedSlotIndex(index);
    if (slot.time_point.length === 10) {
      const d = dayjs(slot.time_point, 'YYYY.MM.DD');
      setSelectedStartDate(d);
      setSelectedEndDate(d);
    }
    setStartTime(slot.start_time);
    setEndTime(slot.end_time);
  }

  return {
    event,
    recommendedTimes,
    selectedStartDate,
    selectedEndDate,
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    selectedSlotIndex,
    focusedField,
    setFocusedField,
    calendarRanges,
    setCalendarRanges,
    hasSelection,
    isConfirmDisabled,
    handleSelectRecommended,
  };
}
