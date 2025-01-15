import clsx from 'clsx';

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
    <label className={clsx('text-lg-200 text-gray-80', className)} {...rest}>
      {children}
      {required && (
        <>
          &nbsp;<strong className="text-lg-200 text-primary-40">*</strong>
        </>
      )}
    </label>
  );
}
