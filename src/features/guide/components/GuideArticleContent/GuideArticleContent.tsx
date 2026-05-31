'use client';

import ReactMarkdown from 'react-markdown';

import { ProgressLink } from '@/navigation';

function MarkdownAnchor({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (href && href.startsWith('/')) {
    return <ProgressLink href={href}>{children}</ProgressLink>;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function GuideArticleContent({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown components={{ a: MarkdownAnchor }}>{markdown}</ReactMarkdown>
  );
}
