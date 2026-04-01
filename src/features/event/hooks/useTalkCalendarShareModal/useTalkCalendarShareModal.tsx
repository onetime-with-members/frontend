import { useEffect, useState } from 'react';

import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import { useSearchParams } from 'next/navigation';

export default function useTalkCalendarShareModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();

  const { removeSearchParams } = useChangeSearchParams();

  useEffect(() => {
    const calendarStatus = searchParams.get('calendar_status');
    if (calendarStatus === 'request') {
      setIsModalOpen(true);
      removeSearchParams(['calendar_status']);
    }
  }, [searchParams, setIsModalOpen, removeSearchParams]);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    handleModalClose,
  };
}
