interface ScheduleInputLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}

export default function ScheduleInputLabel({
  htmlFor,
  children,
  required,
}: ScheduleInputLabelProps) {
  return (
    <div className="flex gap-1">
      <label htmlFor={htmlFor} className="text-sm-200 text-gray-80">
        {children}
      </label>
      {required && <span className="text-primary-40">*</span>}
    </div>
  );
}
