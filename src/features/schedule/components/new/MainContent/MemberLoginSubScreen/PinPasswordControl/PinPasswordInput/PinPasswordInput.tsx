import { useRef } from 'react';

import PinPasswordInputField from './PinPasswordInputField';
import { PinPasswordInputFieldRef } from './PinPasswordInputField/PinPasswordInputField';

export default function PinPasswordInput({
  pin,
  setPin,
}: {
  pin: string;
  setPin: (pin: string) => void;
}) {
  const inputsRef = useRef<Map<number, PinPasswordInputFieldRef | null>>(null);

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === 'Backspace') {
      const newPin = [...pin];
      if (newPin[index] === '-') {
        const map = getMap();
        if (map.has(index - 1)) {
          const inputRef = map.get(index - 1);
          inputRef?.focus();
        }
      }
      newPin[index] = '-';
      setPin(newPin.join(''));
      return;
    }

    if (e.repeat) return;

    const numberRegex = /^[0-9]/g;
    if (!numberRegex.test(e.key)) return;

    const newPin = [...pin];
    newPin[index] = e.key;
    setPin(newPin.join(''));

    if (inputsRef.current?.has(index + 1)) {
      const inputRef = inputsRef.current?.get(index + 1);
      setTimeout(() => {
        inputRef?.focus();
      }, 0);
    }
  }

  function handleFocus(index: number) {
    const map = getMap();
    const inputRef = map.get(index);
    inputRef?.select();
  }

  function getMap() {
    if (!inputsRef.current) {
      inputsRef.current = new Map();
    }
    return inputsRef.current;
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <PinPasswordInputField
          key={index}
          ref={(node) => {
            const map = getMap();
            map.set(index, node);
            return () => {
              map.delete(index);
            };
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={() => handleFocus(index)}
          value={pin[index] === '-' ? '' : pin[index]}
        />
      ))}
    </div>
  );
}
