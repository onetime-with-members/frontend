import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface InputReadOnlyProps {
  value: string;
  className?: string;
  selected?: boolean;
  setSelected?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputReadOnly({
  value,
  className,
  selected,
  setSelected,
}: InputReadOnlyProps) {
  const inputBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      const range = document.createRange();
      range.selectNodeContents(inputBoxRef.current as Node);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);

        if (setSelected) {
          setSelected(false);
        }
      }
    }
  }, [selected]);

  return (
    <div
      ref={inputBoxRef}
      className={clsx(
        'flex items-center gap-4 rounded-xl bg-gray-05 px-5 py-4 text-gray-70',
        className,
      )}
    >
      {value}
    </div>
  );
}
