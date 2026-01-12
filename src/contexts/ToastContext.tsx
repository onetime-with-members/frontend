'use client';

import { createContext, useState } from 'react';

import { ToastOptions } from '@/types';

export const ToastContext = createContext<{
  message: string;
  toast: (message: string, options?: ToastOptions) => void;
  resetToast: () => void;
  options: ToastOptions;
}>({
  message: '',
  toast: () => {},
  resetToast: () => {},
  options: { type: 'success' },
});

export default function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<ToastOptions>({ type: 'success' });

  function toast(message: string, options?: ToastOptions) {
    setMessage(message);
    if (options) setOptions(options);
  }

  function resetToast() {
    setMessage('');
    setOptions({ type: 'success' });
  }

  return (
    <ToastContext.Provider value={{ message, toast, resetToast, options }}>
      {children}
    </ToastContext.Provider>
  );
}
