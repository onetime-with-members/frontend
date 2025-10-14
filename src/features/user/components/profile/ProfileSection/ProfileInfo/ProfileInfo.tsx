import Avatar from '@/components/avatar';
import { useAuth } from '@/lib/auth/auth.client';

export default function ProfileInfo() {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4">
      <Avatar size={64} name={user?.nickname || ''} />
      <div className="flex flex-col gap-1">
        <div className="text-gray-80 title-sm-300">{user?.nickname}</div>
        <div className="text-gray-40 text-sm-200">{user?.email}</div>
      </div>
    </div>
  );
}
