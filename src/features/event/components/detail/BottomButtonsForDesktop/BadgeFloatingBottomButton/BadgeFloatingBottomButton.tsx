import SendButton from './SendButton';
import BadgeButton from '@/components/button/BadgeButton';
import { EditIcon } from '@/components/icon';
import cn from '@/lib/cn';
import { IconPlus } from '@tabler/icons-react';

export default function BadgeFloatingBottomButton({
  onNewScheduleButtonClick,
  onSendButtonClick,
  name,
  className,
  variant = 'primary',
  icon,
  style,
}: {
  onNewScheduleButtonClick: () => void;
  onSendButtonClick: () => void;
  name: string;
  className?: string;
  variant?: 'primary' | 'black';
  icon: 'plus' | 'edit';
  style?: React.CSSProperties;
}) {
  return (
    <>
      <div
        className={cn(
          'fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4',
          className,
        )}
        style={style}
      >
        <SendButton onClick={onSendButtonClick} />
        <BadgeButton
          onClick={onNewScheduleButtonClick}
          variant={variant}
          icon={
            icon === 'plus' ? (
              <IconPlus size={24} />
            ) : (
              <EditIcon fontSize={24} />
            )
          }
        >
          {name}
        </BadgeButton>
      </div>
    </>
  );
}
