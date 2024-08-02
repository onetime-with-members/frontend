import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { IconX } from '@tabler/icons-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);
  const [value, setValue] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleCancelButtonClick() {
    setValue('');
    inputRef.current?.focus();
  }

  useEffect(() => {
    if (value.length > 0) {
      setIsCancelButtonVisible(true);
    } else {
      setIsCancelButtonVisible(false);
    }
  }, [value]);

  return (
    <div className="flex items-center gap-4 rounded-xl bg-gray-05 px-5 py-4">
      <input
        ref={inputRef}
        className={clsx(
          'flex-1 bg-transparent text-gray-70 outline-none placeholder:text-gray-30',
          className,
        )}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
        {...rest}
      />
      {isCancelButtonVisible && (
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-10"
          onClick={handleCancelButtonClick}
        >
          <IconX size={16} className="text-gray-50" />
        </button>
      )}
    </div>
  );
}
