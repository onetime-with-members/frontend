import clsx from 'clsx';

import TrashIcon from '../icon/TrashIcon';
import { IconShare } from '@tabler/icons-react';

interface TBBoardActionButton extends React.HTMLAttributes<HTMLButtonElement> {
  mode: 'share' | 'delete';
}

export default function TBBoardActionButton({
  className,
  mode,
  ...rest
}: TBBoardActionButton) {
  return (
    <button
      className={clsx(
        'flex items-center gap-1 rounded-full px-3 py-2 text-sm-300',
        className,
        {
          'bg-primary-40 text-gray-00': mode === 'share',
          'bg-gray-00 text-danger-50': mode === 'delete',
        },
      )}
      {...rest}
    >
      <span>
        {mode === 'share' ? (
          <IconShare size={16} />
        ) : (
          mode === 'delete' && <TrashIcon fill="#DD3C6C" innerFill="#FFFFFF" />
        )}
      </span>
      <span>{mode === 'share' ? '공유' : mode === 'delete' && '삭제'}</span>
    </button>
  );
}
