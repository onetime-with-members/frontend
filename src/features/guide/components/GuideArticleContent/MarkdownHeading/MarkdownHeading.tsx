import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { getNodeText, slugifyHeading } from '../../../utils/toc';

// 본문 H2에 앵커 id를 부여합니다. id는 utils/toc의 slugifyHeading으로 만들어
// 우측 목차(GuideToc) 링크와 정확히 일치시킵니다. scroll-margin-top은 상단
// 고정 NavBar에 헤딩이 가려지지 않도록 둡니다.
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
