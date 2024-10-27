import clsx from 'clsx';

import EditIcon from './EditIcon';
import TrashIcon from './TrashIcon';

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
      className={clsx(
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
          <TrashIcon fill="#DD3C6C" innerFill="#FBE9EF" />
        ) : (
          <EditIcon fill="#5D6279" />
        )}
      </span>
      <span>수정</span>
    </button>
  );
}
