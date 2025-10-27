export default function ShareButtonWrapper({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {children}
      <span className="whitespace-nowrap text-gray-30 text-sm-200">
        {label}
      </span>
    </div>
  );
}
