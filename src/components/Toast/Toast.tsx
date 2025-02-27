import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import CheckIcon from '@/components/icon/CheckIcon';
import { useToastActions, useToastMessage } from '@/stores/toast';

interface ToastProps {
  bottom?: number;
  duration?: number;
}

export default function Toast({ bottom = 100, duration = 3000 }: ToastProps) {
  const toast = useToastMessage();
  const { resetMessage } = useToastActions();

  useEffect(() => {
    if (toast.length === 0) return;

    const timer = setTimeout(() => {
      resetMessage();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, duration]);

  return createPortal(
    <AnimatePresence>
      {toast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, bottom: 0 }}
          animate={{ opacity: 1, bottom }}
          exit={{ opacity: 0, bottom: 0 }}
          className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#31333F] p-2 pr-5"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success-50">
            <CheckIcon fill="#FFFFFF" size={15} />
          </div>
          <span className="text-gray-00 text-md-200">{toast}</span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector('#toast') as HTMLElement,
  );
}
