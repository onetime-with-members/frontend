import { useNavigate } from 'react-router-dom';

import { IconChevronLeft } from '@tabler/icons-react';

export default function TopAppBar() {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <header className="h-[67px]">
      <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
          <div className="flex items-center">
            <button onClick={handleBackButtonClick}>
              <IconChevronLeft size={24} className="text-gray-80" />
            </button>
          </div>
          <h2 className="text-center text-gray-90 text-lg-300">프로필 수정</h2>
        </div>
      </div>
    </header>
  );
}
