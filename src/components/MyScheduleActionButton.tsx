import EditIcon from './icon/EditIcon';
import TrashIcon from './icon/TrashIcon';
import cn from '@/utils/cn';

interface MyScheduleActionButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  action: 'edit' | 'delete';
}

export default function MyScheduleActionButton({
  action,
  className,
  ...rest
}: MyScheduleActionButtonProps) {
  return (
    <button
      className={cn(
        'flex h-[3rem] flex-1 items-center justify-center gap-1 rounded-lg border px-3 py-2',
        className,
        {
          'border-gray-10 bg-gray-00 text-gray-60': action === 'edit',
          'border-danger-10 bg-danger-10 text-danger-50': action === 'delete',
        },
      )}
      {...rest}
    >
      <span>
        {action === 'delete' ? (
          <TrashIcon size={20} fill="#DD3C6C" innerFill="#FBE9EF" />
        ) : (
          <EditIcon size={20} fill="#5D6279" />
        )}
      </span>
      <span>{action === 'edit' ? '수정' : '삭제'}</span>
    </button>
  );
}
