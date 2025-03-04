import cn from '@/utils/cn';

interface ScheduleInputLabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

export default function ScheduleInputLabel({
  children,
  required,
  className,
  ...rest
}: ScheduleInputLabelProps) {
  return (
    <label className={cn('text-gray-80 text-lg-200', className)} {...rest}>
      {children}
      {required && (
        <>
          &nbsp;<strong className="text-primary-40 text-lg-200">*</strong>
        </>
      )}
    </label>
  );
}
