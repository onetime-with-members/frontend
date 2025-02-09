import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPageRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/not-found');
  }, []);

  return null;
}
