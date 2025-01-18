import FixedScheduleCard from './FixedScheduleCard';
import ShareQRCodeCard from './ShareQRCodeCard';

export default function CardSection() {
  return (
    <section className="mx-auto flex max-w-[50rem] flex-col gap-4 px-4 md:flex-row">
      <FixedScheduleCard />
      <ShareQRCodeCard />
    </section>
  );
}
