import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

// 이미지별 폭은 src 끝의 URL 해시(예: `.../x.png#sm`)로 지정합니다.
// 해시는 실제 파일 요청에서 무시되므로 이미지 로딩에는 영향이 없습니다.
// 힌트가 없으면 기본 `!max-w-xl`을 씁니다.
const MAX_WIDTH_BY_SIZE: Record<string, string> = {
  sm: '!max-w-sm',
  md: '!max-w-md',
  lg: '!max-w-lg',
  xl: '!max-w-xl',
};

export default function MarkdownImage({
  src,
  alt,
  title,
}: ComponentPropsWithoutRef<'img'> & ExtraProps) {
  if (!src || typeof src !== 'string') return null;

  const hashIndex = src.indexOf('#');
  const resolvedSrc = hashIndex >= 0 ? src.slice(0, hashIndex) : src;
  const sizeKey = hashIndex >= 0 ? src.slice(hashIndex + 1) : '';
  const maxWidthClass = MAX_WIDTH_BY_SIZE[sizeKey] ?? MAX_WIDTH_BY_SIZE.xl;

  return (
    <figure className="!mx-0 !my-8 !flex w-full flex-col items-center gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt={alt ?? ''}
        loading="lazy"
        className={`mx-auto block h-auto w-full ${maxWidthClass} rounded-md border !border-solid border-gray-10`}
      />
      {title && (
        <figcaption className="text-center text-gray-40 text-sm-200">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
