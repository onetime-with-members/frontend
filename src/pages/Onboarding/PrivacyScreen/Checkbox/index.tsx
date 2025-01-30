import CheckIcon from '@/components/icon/CheckIcon';
import cn from '@/utils/cn';

interface CheckboxProps {
  checked: boolean;
  handleCheckboxClick: (event: React.MouseEvent) => void;
}

export default function Checkbox({
  checked,
  handleCheckboxClick,
}: CheckboxProps) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-15',
        {
          'bg-primary-40': checked,
        },
      )}
      onClick={handleCheckboxClick}
    >
      <CheckIcon />
    </div>
  );
}
