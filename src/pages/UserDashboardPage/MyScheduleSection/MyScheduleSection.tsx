import Header from './Header/Header';
import SleepTimeUI from './SleepTimeUI/SleepTimeUI';
import MyTimeBlockBoard from '@/components/time-block-board/MyTimeBlockBoard/MyTimeBlockBoard';

export default function MyScheduleSection() {
  return (
    <section className="flex flex-col gap-3">
      <Header />
      <div className="rounded-2xl bg-gray-00 pb-12">
        <SleepTimeUI />
        <MyTimeBlockBoard mode="view" className="pl-3 pr-6" />
      </div>
    </section>
  );
}
