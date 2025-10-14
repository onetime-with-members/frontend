import MyEventsContent from './MyEventsContent';
import MyEventsHeader from './MyEventsHeader';

export default function RecentEventsSection() {
  return (
    <section className="flex flex-col gap-3">
      <MyEventsHeader />
      <MyEventsContent />
    </section>
  );
}
