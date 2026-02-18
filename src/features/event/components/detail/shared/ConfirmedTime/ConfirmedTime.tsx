import ConfirmedTimeHeader from './ConfirmedTimeHeader';
import ConfirmedTimeMain from './ConfirmedTimeMain';

export default function ConfirmedTime() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-gray-70 p-[10px]">
      <ConfirmedTimeHeader />
      <ConfirmedTimeMain />
    </div>
  );
}
