export default function EventInputLabel({
  labelId,
  labelText,
  description,
}: {
  labelId: string;
  labelText: string;
  description: string;
}) {
  return (
    <div className="space-x-2">
      <label htmlFor={labelId} className="align-baseline text-lg-200">
        {labelText}
      </label>
      <span className="align-baseline text-gray-40 text-sm-200">
        {description}
      </span>
    </div>
  );
}
