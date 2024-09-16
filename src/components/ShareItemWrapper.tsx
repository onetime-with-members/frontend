interface ShareItemWrapperProps {
  label: string;
  children: React.ReactNode;
}

export default function ShareItemWrapper({
  label,
  children,
}: ShareItemWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {children}
      <span className="text-sm-200 text-gray-30">{label}</span>
    </div>
  );
}
