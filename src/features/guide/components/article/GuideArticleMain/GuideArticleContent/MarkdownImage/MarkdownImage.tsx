import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

const MAX_WIDTH_BY_SIZE: Record<string, string> = {
  xs: '!max-w-xs',
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
