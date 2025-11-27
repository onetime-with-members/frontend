import { useAuth } from '@/lib/auth';

export default function useHomeUrl() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? '/dashboard' : '/landing';
}
