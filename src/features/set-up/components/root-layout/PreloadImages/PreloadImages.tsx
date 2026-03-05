import SVGImages from './SVGImages';
import ScheduleGuideImages from './ScheduleGuideImages';

export default function PreloadImages() {
  return (
    <div className="hidden">
      <SVGImages />
      <ScheduleGuideImages />
    </div>
  );
}
