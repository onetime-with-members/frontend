import Participants from './Participants/Participants';
import RecommendedTimes from './RecommendedTimes/RecommendedTimes';

export default function RightContentsForDesktop() {
  return (
    <div className="hidden flex-col gap-10 md:flex md:w-[45%]">
      <Participants />
      <RecommendedTimes />
    </div>
  );
}
