import ProfileSection from './ProfileSection';
import SettingSection from './SettingSection';
import { User } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function ProfilePage() {
  const { isPending: isUserPending, data: user } = useQuery<User>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });

  if (isUserPending || user === undefined) {
    return <></>;
  }

  return (
    <main className="flex flex-col gap-7">
      <ProfileSection user={user} />
      <SettingSection />
    </main>
  );
}
