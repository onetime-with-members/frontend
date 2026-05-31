import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

type MarkdownNode = {
  type?: string;
  tagName?: string;
  value?: string;
  children?: MarkdownNode[];
};

// react-markdown은 이미지 한 줄도 <p>로 감쌉니다. 그 안에 블록 요소인
// <figure>가 들어가면 잘못된 중첩이 되어 하이드레이션 오류가 납니다.
// 단락이 이미지 하나만 담고 있으면 <p> 래퍼 없이 그대로 렌더링합니다.
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
    significant.length === 1 && significant[0]?.tagName === 'img';

  if (isImageOnly) {
    return <>{children}</>;
  }

  return <p>{children}</p>;
}
