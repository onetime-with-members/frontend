import NextImage from 'next/image';

export default function BannerImageAndBlur({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return (
    <div className="absolute h-full w-full">
      <NextImage
        src={imageUrl}
        alt={alt}
        fill
        className="z-10 h-full w-full object-contain object-right"
      />
      <NextImage
        src={imageUrl}
        alt={`${alt} blur`}
        fill
        className="absolute top-0 h-full w-full object-contain object-right blur-[32px]"
      />
    </div>
  );
}
