import { useForm } from 'react-hook-form';

import { defaultMemberLoginValues } from '../../constants';
import { guestSchema } from '@/features/event/schemas';
import { GuestSchema } from '@/features/event/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useGuestForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
  } = useForm<GuestSchema>({
    resolver: zodResolver(guestSchema),
    defaultValues: defaultMemberLoginValues,
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  return {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
  };
}
