import MyTimeBlockBoardContent from './MyTimeBlockBoardContent';
import mySchedulesDefault from '@/data/ts/my-schedules';

export default function MySchedules() {
  return (
    <div className="mx-auto w-full max-w-screen-sm pb-32">
      <MyTimeBlockBoardContent mySchedules={mySchedulesDefault} />
    </div>
  );
}
