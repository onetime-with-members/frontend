import FixedScheduleCard from './FixedScheduleCard/FixedScheduleCard';
import ShareQRCodeCard from './ShareQRCodeCard/ShareQRCodeCard';

export default function CardSection() {
  return (
    <section className="mx-auto flex max-w-[50rem] flex-col gap-10 px-4 md:flex-row">
      <FixedScheduleCard />
      <ShareQRCodeCard />
    </section>
  );
}
