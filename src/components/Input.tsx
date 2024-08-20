import clsx from 'clsx';
import { useRef } from 'react';

// import { IconX } from '@tabler/icons-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
}

export default function Input({
  className,
  value,
  inputClassName,
  ...rest
}: InputProps) {
  // const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setInputValue(e.target.value);
  // }

  // function handleCancelButtonClick() {
  //   setInputValue('');
  //   inputRef.current?.focus();
  // }

  // useEffect(() => {
  //   if (value.length > 0) {
  //     setIsCancelButtonVisible(true);
  //   } else {
  //     setIsCancelButtonVisible(false);
  //   }
  // }, [value]);

  return (
    <div
      className={clsx(
        'flex items-center gap-4 rounded-xl bg-gray-05',
        className,
      )}
    >
      <input
        ref={inputRef}
        className={clsx(
          'flex-1 bg-transparent px-5 py-4 text-gray-70 outline-none placeholder:text-gray-30',
          inputClassName,
        )}
        value={value}
        // onChange={handleInputChange}
        autoComplete="off"
        {...rest}
      />
      {/* {isCancelButtonVisible && (
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-10"
          onClick={handleCancelButtonClick}
        >
          <IconX size={16} className="text-gray-50" />
        </button>
      )} */}
    </div>
  );
}
