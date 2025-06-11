import { useRef } from 'react';

import cn from '@/lib/cn';
import { isNumber } from '@/lib/utils';

export default function PinPasswordInput({
  inputId,
  pin,
  setPin,
}: {
  inputId: string;
  pin: string;
  setPin: (pin: string) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const MAX_PIN_LENGTH = 4;

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    if (!isNumber(e.target.value)) {
      e.target.value = '';
      return;
    }
    const newPin = pin.split('');
    newPin[index] = e.target.value;
    setPin(newPin.join(''));

    if (index < MAX_PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === 'Backspace') {
      const newPin = pin.split('');
      if (e.currentTarget.value) {
        newPin[index] = '-';
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newPin[index - 1] = '-';
      }
      setPin(newPin.join(''));
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: MAX_PIN_LENGTH }).map((_, index) => (
        <PinPasswordInputField
          key={index}
          size={1}
          maxLength={1}
          id={index === 0 ? inputId : `pin-${index + 1}`}
          inputRef={(el) => {
            inputRefs.current[index] = el;
          }}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          inputMode="numeric"
          value={pin[index] === '-' ? '' : pin[index]}
        />
      ))}
    </div>
  );
}

export function PinPasswordInputField({
  inputRef,
  className,
  ...props
}: {
  inputRef: React.Ref<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      ref={inputRef}
      className={cn(
        'rounded-xl bg-gray-05 px-5 py-4 text-center text-gray-90 outline-none text-md-200 placeholder:text-gray-30 focus:outline-2 focus:outline-primary-30',
        className,
      )}
      autoComplete="off"
      placeholder="_"
      {...props}
    />
  );
}
