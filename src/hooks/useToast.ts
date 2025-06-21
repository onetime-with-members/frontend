import { useContext } from 'react';

import { ToastContext } from '@/contexts/toast';

export default function useToast() {
  const { toast } = useContext(ToastContext);

  return toast;
}
