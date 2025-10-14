import FixedScheduleCard from './FixedScheduleCard';
import QRCodeCard from './QRCodeCard';

export default async function CardSection() {
  return (
    <section className="mx-auto flex max-w-[50rem] flex-col gap-10 px-4 md:flex-row">
      <FixedScheduleCard />
      <QRCodeCard />
    </section>
  );
}
