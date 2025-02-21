import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconChevronLeft } from '@tabler/icons-react';

export default function TopAppBarForMobile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <header className="block h-[67px] sm:hidden">
      <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
        <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
          <div className="flex items-center">
            <button onClick={handleBackButtonClick}>
              <IconChevronLeft size={24} className="text-gray-80" />
            </button>
          </div>
          <h2 className="flex items-center justify-center whitespace-nowrap text-center text-gray-90 text-lg-300">
            {t('profileEdit.editProfile')}
          </h2>
        </div>
      </div>
    </header>
  );
}
