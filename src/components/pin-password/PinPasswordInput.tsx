import clsx from 'clsx';
import { useRef } from 'react';

import { MAX_PIN_LENGTH } from '../../constants/pin-password';
import { numberRegex } from '../../constants/regex';
import PinPasswordInputField from './PinPasswordInputField';

interface PinPasswordInputProps {
  inputId: string;
  className?: string;
  pin: string;
  setPin: (pin: string) => void;
}

export default function PinPasswordInput({
  inputId,
  className,
  pin,
  setPin,
}: PinPasswordInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    if (!numberRegex.test(e.target.value)) {
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

  return (
    <div className={clsx('flex gap-3', className)}>
      {Array.from({ length: MAX_PIN_LENGTH }).map((_, index) => (
        <PinPasswordInputField
          key={index}
          size={1}
          maxLength={1}
          id={index === 0 ? inputId : `pin-${index + 1}`}
          inputRef={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputMode="numeric"
          value={pin[index] === '-' ? '' : pin[index]}
        />
      ))}
    </div>
  );
}
