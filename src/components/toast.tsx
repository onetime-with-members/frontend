'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

import CheckIcon from '@/components/icon/check';
import { useToastActions, useToastMessage } from '@/stores/toast';

export default function Toast({
  bottom = 140,
  duration = 3000,
}: {
  bottom?: number;
  duration?: number;
}) {
  const message = useToastMessage();
  const { resetMessage } = useToastActions();

  useEffect(() => {
    if (message.length === 0) return;

    const timer = setTimeout(() => {
      resetMessage();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, resetMessage]);

  return (
    <AnimatePresence>
      {message.length > 0 && (
        <motion.div
          initial={{ opacity: 0, bottom: 0 }}
          animate={{ opacity: 1, bottom }}
          exit={{ opacity: 0, bottom: 0 }}
          className="fixed left-1/2 z-50 flex -translate-x-1/2 translate-y-full items-center gap-2 rounded-full bg-[#31333F] p-2 pr-5"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success-50">
            <CheckIcon fill="#FFFFFF" size={15} />
          </div>
          <span className="whitespace-nowrap text-gray-00 text-md-200">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
