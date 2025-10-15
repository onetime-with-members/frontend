import SleepTimeSection from '../components/detail/SleepTimeSection';
import TimeBlockBoardSection from '../components/detail/TimeBlockBoardSection';

export default function MySchedulePage() {
  return (
    <main className="mx-auto w-full max-w-screen-md pb-32">
      <SleepTimeSection />
      <TimeBlockBoardSection />
    </main>
  );
}
