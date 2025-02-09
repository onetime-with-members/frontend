import { useRef, useState } from 'react';

interface useLongPressProps {
  delay?: number;
  onClick?: (event: React.MouseEvent | React.TouchEvent) => void;
  onLongPressStart?: () => void;
  onLongPressEnd?: () => void;
}

export default function useLongPress({
  delay = 500,
  onClick,
  onLongPressStart,
  onLongPressEnd,
}: useLongPressProps) {
  const [pressStatus, setPressStatus] = useState<'click' | 'longpress' | null>(
    null,
  );

  const timerRef = useRef<number | null>(null);

  function handleLongPressStart() {
    setPressStatus('click');
    timerRef.current = window.setTimeout(() => {
      setPressStatus('longpress');
      onLongPressStart && onLongPressStart();
    }, delay);
  }

  function handleLongPressEnd(event: React.MouseEvent | React.TouchEvent) {
    if (!timerRef.current) return;
    clearTimeout(timerRef.current);
    if (pressStatus === 'click') {
      onClick && onClick(event);
    } else if (pressStatus === 'longpress') {
      onLongPressEnd && onLongPressEnd();
    }
    setPressStatus(null);
  }

  return {
    handleLongPressStart,
    handleLongPressEnd,
  };
}
