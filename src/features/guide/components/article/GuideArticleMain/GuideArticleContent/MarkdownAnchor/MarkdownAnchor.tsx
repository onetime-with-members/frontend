import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { ProgressLink } from '@/navigation';

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
