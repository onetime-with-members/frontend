import FixedScheduleCard from './FixedScheduleCard';
import ShareQRCodeCard from './ShareQRCodeCard';

export default function CardSection() {
  return (
    <section className="flex flex-col gap-4 px-4">
      <FixedScheduleCard />
      <ShareQRCodeCard />
    </section>
  );
}
