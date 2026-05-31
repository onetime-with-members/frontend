'use client';

import ReactMarkdown, { type Components } from 'react-markdown';

import MarkdownAnchor from './MarkdownAnchor';
import MarkdownImage from './MarkdownImage';
import MarkdownParagraph from './MarkdownParagraph';

const markdownComponents: Components = {
  a: MarkdownAnchor,
  img: MarkdownImage,
  p: MarkdownParagraph,
};

export default function GuideArticleContent({
  markdown,
}: {
  markdown: string;
}) {
  return (
    <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>
  );
}
