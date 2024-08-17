import clsx from 'clsx';

import MemberBadge from '../MemberBadge';
import { IconX } from '@tabler/icons-react';

interface TimeBlockDialogProps {
  onClose: () => void;
}

export default function TimeBlockDialog({ onClose }: TimeBlockDialogProps) {
  const style = {
    title: 'text-md-300',
    memberBadgeList: 'flex mt-2 flex-wrap gap-2',
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[23rem] cursor-auto overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-primary-50 px-5 pb-3 pt-4">
          <div className="text-lg-300 text-gray-00">
            <span>2024.03.01 월</span>
            <span className="ml-2">18:00 - 20:00</span>
          </div>
          <button className="text-primary-10" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="px-5 py-4">
          <div>
            <h3 className={clsx(style.title, 'text-primary-60')}>가능</h3>
            <div className={style.memberBadgeList}>
              <MemberBadge>닉네임</MemberBadge>
              <MemberBadge>닉네임</MemberBadge>
              <MemberBadge>닉네임</MemberBadge>
              <MemberBadge>닉네임</MemberBadge>
              <MemberBadge>닉네임</MemberBadge>
              <MemberBadge>닉네임</MemberBadge>
              <MemberBadge>닉네임</MemberBadge>
            </div>
          </div>
          <div className="mt-5">
            <h3 className={clsx(style.title, 'text-gray-50')}>불가능</h3>
            <div className={style.memberBadgeList}>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
