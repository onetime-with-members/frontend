import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

type MarkdownNode = {
  type?: string;
  tagName?: string;
  value?: string;
  children?: MarkdownNode[];
};

export default function MarkdownParagraph({
  node,
  children,
}: ComponentPropsWithoutRef<'p'> & ExtraProps) {
  const childNodes =
    (node as unknown as MarkdownNode | undefined)?.children ?? [];
  const significant = childNodes.filter(
    (child) => !(child.type === 'text' && (child.value ?? '').trim() === ''),
  );
  const isImageOnly =
    significant.length > 0 &&
    significant.every((child) => child.tagName === 'img');

  if (isImageOnly) {
    if (significant.length === 1) {
      return <>{children}</>;
    }

    return (
      <div className="!my-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-start sm:[&>figure]:min-w-0 sm:[&>figure]:flex-1 [&>figure]:!my-0">
        {children}
      </div>
    );
  }

  return <p>{children}</p>;
}
