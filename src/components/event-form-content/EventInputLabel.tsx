interface InputLabelProps {
  labelId: string;
  labelText: string;
  description: string;
}

export default function EventInputLabel({
  labelId,
  labelText,
  description,
}: InputLabelProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={labelId} className="text-lg-200">
        {labelText}
      </label>
      <span className="text-sm-200 text-gray-40">{description}</span>
    </div>
  );
}
