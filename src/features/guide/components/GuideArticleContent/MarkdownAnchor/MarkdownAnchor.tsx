import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { ProgressLink } from '@/navigation';

// markdown-body 기본 링크 색(파랑)을 시안 A의 primary 색으로 덮습니다.
const LINK_CLASS =
  '!font-medium !text-primary-50 hover:!text-primary-60 hover:underline';

export default function MarkdownAnchor({
  href,
  children,
}: ComponentPropsWithoutRef<'a'> & ExtraProps) {
  if (href && href.startsWith('/')) {
    return (
      <ProgressLink href={href} className={LINK_CLASS}>
        {children}
      </ProgressLink>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={LINK_CLASS}
    >
      {children}
    </a>
  );
}
