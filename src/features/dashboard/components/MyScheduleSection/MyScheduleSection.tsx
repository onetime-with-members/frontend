import MyScheduleContent from './MyScheduleContent';
import MyScheduleHeader from './MyScheduleHeader';

export default function MyScheduleSection() {
  return (
    <section className="flex flex-col gap-3">
      <MyScheduleHeader />
      <MyScheduleContent />
    </section>
  );
}
