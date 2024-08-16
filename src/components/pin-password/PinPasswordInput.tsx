import clsx from 'clsx';
import { useRef, useState } from 'react';

import { MAX_PIN_LENGTH } from '../../constants/pin-password';
import { numberRegex } from '../../constants/regex';
import PinPasswordInputField from './PinPasswordInputField';

interface PinPasswordInputProps {
  inputId: string;
  className?: string;
}

export default function PinPasswordInput({
  inputId,
  className,
}: PinPasswordInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [, setValue] = useState('');

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    if (!numberRegex.test(e.target.value)) {
      e.target.value = '';
      return;
    }

    setValue((prev) => {
      const newValue = prev.split('');
      newValue[index] = e.target.value;
      return newValue.join('');
    });

    if (index < MAX_PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
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
        />
      ))}
    </div>
  );
}
