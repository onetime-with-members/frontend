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
// - 이미지 하나만 담은 단락: <p> 래퍼 없이 그대로 렌더링합니다.
// - 이미지 둘 이상을 담은 단락(한 단락에 연속으로 적은 이미지): 가로 행으로
//   나란히 보여 줍니다(작은 화면에서는 세로로 쌓임).
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
