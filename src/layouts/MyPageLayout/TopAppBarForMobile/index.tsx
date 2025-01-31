import { useNavigate } from 'react-router-dom';

import { IconChevronLeft } from '@tabler/icons-react';

interface TopAppBarForMobileProps {
  pageTitle: string | undefined;
}

export default function TopAppBarForMobile({
  pageTitle,
}: TopAppBarForMobileProps) {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <header>
      <nav className="flex h-[4rem]">
        <div className="fixed z-[9999] flex h-[4rem] w-full justify-center bg-gray-00 px-4">
          <div className="w-full max-w-screen-md">
            <div className="grid h-[4rem] grid-cols-3">
              <div className="flex items-center justify-start">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} />
                </button>
              </div>
              <div className="flex items-center justify-center text-gray-90 text-lg-300">
                {pageTitle}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
