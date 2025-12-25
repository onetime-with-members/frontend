import CheckThickIcon from '@/components/icon/CheckThickIcon';
import cn from '@/lib/cn';

export default function RedCheckbox({
  isChecked,
  className,
  ...rest
}: {
  isChecked: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-danger-20 bg-gray-00 text-sm',
        {
          'border-danger-50 bg-danger-50 text-gray-00': isChecked,
        },
        className,
      )}
      {...rest}
    >
      {isChecked && <CheckThickIcon />}
    </div>
  );
}
