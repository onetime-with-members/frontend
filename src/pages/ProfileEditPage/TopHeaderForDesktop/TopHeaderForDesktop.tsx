import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { IconChevronLeft } from '@tabler/icons-react';

export default function TopHeaderForDesktop() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleBackButtonClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className="mx-auto hidden w-full max-w-[480px] items-center gap-0.5 pb-8 pt-10 text-gray-90 sm:flex">
      <Link
        to="/mypage/profile"
        className="text-gray-90"
        onClick={handleBackButtonClick}
      >
        <IconChevronLeft size={32} />
      </Link>
      <h1 className="title-lg-300">{t('profileEdit.editProfile')}</h1>
    </div>
  );
}
