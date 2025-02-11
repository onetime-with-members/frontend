import { Link, useLocation } from 'react-router-dom';

export default function LoginButton() {
  const location = useLocation();

  return (
    <Link
      to={`/login?redirect_url=${location.pathname}`}
      className="flex items-center text-lg-200"
    >
      로그인
    </Link>
  );
}
