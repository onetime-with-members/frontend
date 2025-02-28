import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

export default function LoginButton() {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Link
      to={`/login?redirect_url=${location.pathname}`}
      className="flex items-center text-lg-200"
    >
      {t('navbar.login')}
    </Link>
  );
}
