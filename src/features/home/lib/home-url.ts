import { auth } from '@/lib/auth';

export default async function getHomeUrl() {
  const { isLoggedIn } = await auth();

  return isLoggedIn ? '/dashboard' : '/landing';
}
