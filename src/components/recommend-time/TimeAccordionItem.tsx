import clsx from 'clsx';
import { useState } from 'react';

import MemberBadge from '../MemberBadge';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export default function TimeAccordionItem() {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    badge: 'text-sm-200 rounded-full px-3 py-1',
    title: 'text-md-300',
    badgeList: 'mt-2 flex flex-wrap gap-2',
    badgePrimary: '',
    badgeGray: '',
    titlePrimary: '',
    titleGray: '',
  };

  style.badgePrimary = clsx(style.badge, 'bg-primary-00 text-primary-60');
  style.badgeGray = clsx(style.badge, 'bg-gray-05 text-gray-40');
  style.titlePrimary = clsx(style.title, 'text-primary-60');
  style.titleGray = clsx(style.title, 'text-gray-50');

  function handleAccordionClick() {
    setIsOpen(!isOpen);
  }

  return (
    <li
      className={clsx('rounded-2xl', {
        'border border-primary-50 bg-gray-00': isOpen,
        'border border-gray-05 bg-gray-05': !isOpen,
      })}
    >
      <div
        className="flex cursor-pointer items-center gap-2 px-5 py-4"
        onClick={handleAccordionClick}
      >
        <span
          className={clsx('text-lg-200 flex-1', {
            'text-primary-50': isOpen,
            'text-gray-50': !isOpen,
          })}
        >
          18:00 - 20:00
        </span>
        <div className="text-sm-300 rounded-full bg-primary-50 px-3 py-1 text-gray-00">
          8명
        </div>
        {isOpen ? (
          <IconChevronUp size={24} className="text-primary-50" />
        ) : (
          <IconChevronDown size={24} className="text-gray-30" />
        )}
      </div>
      {isOpen && (
        <div className="px-5 pb-4">
          <div>
            <div className={style.titlePrimary}>가능</div>
            <div className={style.badgeList}>
              <MemberBadge variant="primary">닉네임</MemberBadge>
              <MemberBadge variant="primary">닉네임</MemberBadge>
              <MemberBadge variant="primary">닉네임</MemberBadge>
              <MemberBadge variant="primary">닉네임</MemberBadge>
              <MemberBadge variant="primary">닉네임</MemberBadge>
              <MemberBadge variant="primary">닉네임</MemberBadge>
            </div>
          </div>
          <div className="mt-5">
            <div className={style.titleGray}>불가능</div>
            <div className={style.badgeList}>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
              <MemberBadge variant="gray">닉네임</MemberBadge>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
