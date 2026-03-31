import { useEffect, useState } from 'react';

import { SESSION_STORAGE_SHOW_KAKAO_AFTER_CONFIRM } from '../../constants';
import { useParams } from 'next/navigation';

export default function useTalkCalendarShareModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    const storedId = sessionStorage.getItem(
      SESSION_STORAGE_SHOW_KAKAO_AFTER_CONFIRM,
    );
    if (storedId === params.id) {
      setIsModalOpen(true);
    }
  }, [params.id]);

  function handleModalClose() {
    sessionStorage.removeItem(SESSION_STORAGE_SHOW_KAKAO_AFTER_CONFIRM);
    setIsModalOpen(false);
  }

  return {
    isModalOpen,
    handleModalClose,
  };
}
