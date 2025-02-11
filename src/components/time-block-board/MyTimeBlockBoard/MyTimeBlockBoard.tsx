import BoardContent from './BoardContent/BoardContent';
import LeftTimeLine from './LeftTimeLine/LeftTimeLine';
import TopDateGroup from './TopDateGroup/TopDateGroup';

interface MyTimeBlockBoard {
  mode: 'view' | 'edit';
  className?: string;
  backgroundColor?: 'gray' | 'white';
  topDateGroupClassName?: string;
}

export default function MyTimeBlockBoard({
  mode,
  className,
  backgroundColor = 'gray',
  topDateGroupClassName,
}: MyTimeBlockBoard) {
  return (
    <div className={className}>
      <div className="flex flex-col">
        <TopDateGroup className={topDateGroupClassName} />
        <div className="flex flex-1">
          <LeftTimeLine />
          <BoardContent mode={mode} backgroundColor={backgroundColor} />
        </div>
      </div>
    </div>
  );
}
