import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import imageSizes from '@/features/guide/generated/image-sizes.json';
import Image from 'next/image';

const SIZE_HINT: Record<string, { className: string; maxPx: number }> = {
  xs: { className: '!max-w-xs', maxPx: 320 },
  sm: { className: '!max-w-sm', maxPx: 384 },
  md: { className: '!max-w-md', maxPx: 448 },
  lg: { className: '!max-w-lg', maxPx: 512 },
  xl: { className: '!max-w-xl', maxPx: 576 },
};

const sizes = imageSizes as Record<string, { width: number; height: number }>;

export default function MarkdownImage({
  src,
  alt,
  title,
}: ComponentPropsWithoutRef<'img'> & ExtraProps) {
  if (!src || typeof src !== 'string') return null;

  const hashIndex = src.indexOf('#');
  const resolvedSrc = hashIndex >= 0 ? src.slice(0, hashIndex) : src;
  const sizeKey = hashIndex >= 0 ? src.slice(hashIndex + 1) : '';
  const { className: maxWidthClass, maxPx } =
    SIZE_HINT[sizeKey] ?? SIZE_HINT.xl;

  const dimensions = sizes[resolvedSrc];

  return (
    <figure className="!mx-0 !my-8 !flex w-full flex-col items-center gap-1">
      <Image
        src={resolvedSrc}
        alt={alt ?? ''}
        width={dimensions?.width ?? 1200}
        height={dimensions?.height ?? 800}
        sizes={`(max-width: ${maxPx}px) 100vw, ${maxPx}px`}
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
