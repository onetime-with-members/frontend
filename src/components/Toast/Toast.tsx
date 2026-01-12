'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect } from 'react';

import { CheckIcon } from '@/components/icon';
import { ToastContext } from '@/contexts/ToastContext';
import cn from '@/lib/cn';
import { IconExclamationMark } from '@tabler/icons-react';

export default function Toast({
  bottom = 140,
  duration = 3000,
}: {
  bottom?: number;
  duration?: number;
}) {
  const { message, resetToast, options } = useContext(ToastContext);

  useEffect(() => {
    if (message.length === 0) return;

    const timer = setTimeout(() => {
      resetToast();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, resetToast]);

  return (
    <AnimatePresence>
      {message.length > 0 && (
        <motion.div
          initial={{ opacity: 0, bottom: 0 }}
          animate={{ opacity: 1, bottom }}
          exit={{ opacity: 0, bottom: 0 }}
          className="fixed left-1/2 z-50 flex -translate-x-1/2 translate-y-full items-center gap-2 rounded-full bg-[#31333F] p-2 pr-5 text-gray-00"
        >
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full bg-success-50 text-[15px]',
              {
                'bg-danger-50': options.type === 'error',
              },
            )}
          >
            {options.type === 'error' ? (
              <IconExclamationMark size={20} />
            ) : (
              <CheckIcon />
            )}
          </div>
          <span className="whitespace-nowrap text-md-200">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
