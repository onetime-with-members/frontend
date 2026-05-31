import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

export default function MarkdownImage({
  src,
  alt,
  title,
}: ComponentPropsWithoutRef<'img'> & ExtraProps) {
  if (!src || typeof src !== 'string') return null;

  return (
    <figure className="!mx-0 !my-8 !flex w-full flex-col items-center gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="mx-auto block h-auto w-full !max-w-xl rounded-md border !border-solid border-gray-10"
      />
      {title && (
        <figcaption className="text-center text-gray-40 text-sm-200">
          {title}
        </figcaption>
      )}
    </figure>
  );
}
