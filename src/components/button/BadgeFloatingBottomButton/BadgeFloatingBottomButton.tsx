import BadgeButton from '../BadgeButton/BadgeButton';
import cn from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';

interface BadgeFloatingBottomButtonProps {
  onClick: () => void;
  name: string;
  className?: string;
  variant?: 'primary' | 'black';
  style?: React.CSSProperties;
}

export default function BadgeFloatingBottomButton({
  onClick,
  name,
  className,
  variant = 'primary',
  style,
}: BadgeFloatingBottomButtonProps) {
  return (
    <>
      <div
        className={cn(
          'fixed bottom-8 left-1/2 flex -translate-x-1/2 justify-center',
          className,
        )}
        style={style}
      >
        <BadgeButton onClick={onClick} variant={variant}>
          <span className="flex items-center justify-center gap-1">
            <span>{name}</span>
            <span>
              <IconPlus size={24} />
            </span>
          </span>
        </BadgeButton>
      </div>
    </>
  );
}
