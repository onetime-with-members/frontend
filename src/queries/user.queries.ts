import { UserType } from '@/lib/types';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useUserQuery = () =>
  useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
  });
