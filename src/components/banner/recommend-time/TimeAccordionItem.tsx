import { useState } from 'react';

import MemberBadge from '../../MemberBadge';
import cn from '@/utils/cn';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

interface TimeAccordionItemProps {
  startTime: string;
  endTime: string;
  members: {
    possible: string[];
    impossible: string[];
  };
}

export default function TimeAccordionItem({
  startTime,
  endTime,
  members,
}: TimeAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    title: 'text-md-300',
    badgeList: 'mt-2 flex flex-wrap gap-2',
  };

  function handleAccordionClick() {
    setIsOpen(!isOpen);
  }

  return (
    <li
      className={cn('rounded-2xl border border-gray-05 bg-gray-05', {
        'border-primary-50 bg-gray-00': isOpen,
      })}
    >
      <div
        className="flex cursor-pointer items-center gap-2 px-5 py-4"
        onClick={handleAccordionClick}
      >
        <span
          className={cn('flex-1 text-gray-50 text-lg-200', {
            'text-primary-50': isOpen,
          })}
        >
          {startTime} - {endTime}
        </span>
        <div className="rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-300">
          {members.possible.length}명
        </div>
        {isOpen ? (
          <IconChevronUp size={24} className="text-primary-50" />
        ) : (
          <IconChevronDown size={24} className="text-gray-30" />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-5 px-5 pb-4">
          {members.possible.length > 0 && (
            <div>
              <div className={cn(style.title, 'text-primary-60')}>가능</div>
              <div className={style.badgeList}>
                {members.possible.map((member) => (
                  <MemberBadge key={member} variant="primary">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
          {members.impossible.length > 0 && (
            <div>
              <div className={cn(style.title, 'text-gray-50')}>불가능</div>
              <div className={style.badgeList}>
                {members.impossible.map((member) => (
                  <MemberBadge key={member} variant="gray">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
