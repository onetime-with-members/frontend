import cn from '@/lib/cn';

interface TimeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  clickedFirst?: boolean;
  bgOpacity?: number;
  editable?: boolean;
  isPossibleTime?: boolean;
  isAllMembersAvailable?: boolean;
  backgroundColor: 'white' | 'gray';
}
const TimeBlock = ({
  active,
  clickedFirst,
  className,
  bgOpacity = 1,
  style,
  editable,
  isPossibleTime = true,
  isAllMembersAvailable = false,
  backgroundColor = 'gray',
  ...rest
}: TimeBlockProps) => {
  return (
    <div
      className={cn(
        'h-[2rem] w-full border-b border-gray-10 bg-gray-05 last:border-b-0 odd:border-dashed even:border-solid',
        {
          'bg-gray-00': backgroundColor === 'white',
        },
        {
          'bg-primary-50': isPossibleTime && active,
          'bg-danger-50': !isPossibleTime && !active,
        },
        clickedFirst && {
          'border border-dashed odd:border-dashed even:border-dashed':
            clickedFirst,
          'border-primary-50 bg-primary-10': isPossibleTime,
          'border-danger-50 bg-danger-10': !isPossibleTime,
        },
        { 'bg-success-50': isAllMembersAvailable },
        className,
      )}
      style={{
        backgroundColor: editable
          ? ''
          : active && !isAllMembersAvailable
            ? `rgba(76, 101, 229, ${bgOpacity})`
            : '',
        ...style,
      }}
      {...rest}
    />
  );
};

export default TimeBlock;
