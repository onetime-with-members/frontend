import { useNavigate } from 'react-router-dom';

import { IconChevronLeft } from '@tabler/icons-react';

export default function TopActionForDesktop() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <div className="hidden w-full items-center justify-start pb-6 md:flex">
      <button
        onClick={handleBackButtonClick}
        className="flex items-center justify-center"
      >
        <IconChevronLeft size={24} />
      </button>
    </div>
  );
}
