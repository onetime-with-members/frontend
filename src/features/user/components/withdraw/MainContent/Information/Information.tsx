import AgreeToWithdraw from './AgreeToWithdraw';
import BrokenClockImage from './BrokenClockImage';

export default function Information({
  isChecked,
  onChecked,
}: {
  isChecked: boolean;
  onChecked: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <BrokenClockImage />
      <AgreeToWithdraw isChecked={isChecked} onChecked={onChecked} />
    </div>
  );
}
