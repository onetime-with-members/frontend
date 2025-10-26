import { useForm } from 'react-hook-form';

import { defaultMemberLoginValues } from '../../constants';
import { GuestFormType } from '@/lib/validation/form-types';
import { guestSchema } from '@/lib/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useGuestForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    control,
  } = useForm<GuestFormType>({
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
