'use client';

import { createContext, useState } from 'react';

export const ToastContext = createContext<{
  message: string;
  toast: (message: string) => void;
  resetMessage: () => void;
}>({
  message: '',
  toast: () => {},
  resetMessage: () => {},
});

export default function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState('');

  function toast(message: string) {
    setMessage(message);
  }

  function resetMessage() {
    setMessage('');
  }

  return (
    <ToastContext.Provider value={{ message, toast, resetMessage }}>
      {children}
    </ToastContext.Provider>
  );
}
