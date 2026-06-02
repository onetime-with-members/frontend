import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { ProgressLink } from '@/navigation';

// 링크 색(primary)은 styles/guide-article.css의 `.guide-markdown a`에서 처리합니다.
export default function MarkdownAnchor({
  href,
  children,
}: ComponentPropsWithoutRef<'a'> & ExtraProps) {
  if (href && href.startsWith('/')) {
    return <ProgressLink href={href}>{children}</ProgressLink>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
