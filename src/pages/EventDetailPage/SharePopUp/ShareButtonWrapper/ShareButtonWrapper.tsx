interface ShareButtonWrapperProps {
  label: string;
  children: React.ReactNode;
}

export default function ShareButtonWrapper({
  label,
  children,
}: ShareButtonWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {children}
      <span className="whitespace-nowrap text-gray-30 text-sm-200">
        {label}
      </span>
    </div>
  );
}
