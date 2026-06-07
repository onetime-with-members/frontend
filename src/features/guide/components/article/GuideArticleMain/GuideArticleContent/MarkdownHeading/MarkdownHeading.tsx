import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { getNodeText, slugifyHeading } from '@/features/guide/utils/toc';

export default function MarkdownHeading({
  node,
  children,
}: ComponentPropsWithoutRef<'h2'> & ExtraProps) {
  const id = slugifyHeading(getNodeText(node));
  return (
    <h2 id={id} className="scroll-mt-24">
      {children}
    </h2>
  );
}
