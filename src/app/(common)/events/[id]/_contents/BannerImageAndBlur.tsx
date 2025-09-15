import NextImage from 'next/image';

export default function BannerImageAndBlur({
  imageUrl,
  alt,
}: {
  imageUrl: string;
  alt: string;
}) {
  return (
    <div className="relative h-full">
      <NextImage
        src={imageUrl}
        alt={alt}
        width={112}
        height={88}
        className="absolute right-0 z-10 h-full w-full object-cover"
      />
      <NextImage
        src={imageUrl}
        alt={`${alt} blur`}
        width={0}
        height={0}
        className="h-full w-full object-cover blur-lg"
      />
    </div>
  );
}
