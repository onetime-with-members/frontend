import { useNavigate } from 'react-router-dom';

import { IconChevronLeft } from '@tabler/icons-react';

export default function TopAppBar() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate('/login');
  }

  return (
    <header className="py-5">
      <button onClick={handleBackButtonClick}>
        <IconChevronLeft />
      </button>
    </header>
  );
}
