import FixedScheduleCard from '../card-section/FixedScheduleCard';
import ShareQRCodeCard from '../card-section/ShareQRCodeCard';

export default function CardSection() {
  return (
    <section className="flex flex-col gap-4">
      <FixedScheduleCard />
      <ShareQRCodeCard />
    </section>
  );
}
