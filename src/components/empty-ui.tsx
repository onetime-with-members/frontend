import ClockIcon from './icon/ClockIcon';

export default function EmptyUI({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 p-5 text-gray-30">
      <div>
        <ClockIcon fontSize={48} />
      </div>
      <div className="text-md-200">{children}</div>
    </div>
  );
}
