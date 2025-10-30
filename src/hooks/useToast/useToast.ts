import { useContext } from 'react';

import { ToastContext } from '@/contexts/ToastContext';

export default function useToast() {
  const { toast } = useContext(ToastContext);

  return toast;
}
