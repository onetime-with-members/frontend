import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface PinPasswordInputFieldRef {
  focus: () => void;
  select: () => void;
}

interface PinPasswordInputProps {
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
}

const PinPasswordInputField = forwardRef<
  PinPasswordInputFieldRef,
  PinPasswordInputProps
>(({ onKeyDown, onFocus, value }, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    select: () => {
      inputRef.current?.select();
    },
  }));

  return (
    <input
      ref={inputRef}
      className="pin rounded-xl bg-gray-05 px-5 py-4 text-center text-gray-90 outline-none text-md-200 placeholder:text-gray-30 focus:outline-2 focus:outline-primary-30"
      autoComplete="off"
      placeholder="_"
      inputMode="numeric"
      size={1}
      maxLength={1}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      value={value}
    />
  );
});

PinPasswordInputField.displayName = 'PinPasswordInputField';

export default PinPasswordInputField;
