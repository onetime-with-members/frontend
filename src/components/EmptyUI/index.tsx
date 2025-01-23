import ClockIcon from '../icon/ClockIcon';

interface EmptyUIProps {
  children: React.ReactNode;
}

export default function EmptyUI({ children }: EmptyUIProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-5">
      <div>
        <ClockIcon fill="#CBCDD7" innerFill="#FFFFFF" size={48} />
      </div>
      <div className="text-gray-30 text-md-200">{children}</div>
    </div>
  );
}
