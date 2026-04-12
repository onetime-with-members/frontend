import ConfirmedTimeHeader from './ConfirmedTimeHeader';
import ConfirmedTimeMain from './ConfirmedTimeMain';

export default function ConfirmedTime() {
  return (
    <div className="flex w-full flex-col rounded-2xl bg-gray-80 p-3">
      <ConfirmedTimeHeader />
      <ConfirmedTimeMain />
    </div>
  );
}
