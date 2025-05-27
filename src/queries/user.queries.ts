import axios from '@/lib/axios';
import { UserType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export const useUserQuery = () =>
  useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });
