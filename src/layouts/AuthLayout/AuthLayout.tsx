import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      navigate('/login');
    }
  }, [location]);

  const accessToken = localStorage.getItem('access-token');
  const refreshToken = localStorage.getItem('refresh-token');

  if (accessToken && refreshToken) {
    return <Outlet />;
  }

  return null;
}
