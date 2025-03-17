import cn from '@/utils/cn';
import Image from 'next/image';

interface AvatarProps {
  size?: number;
  name: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export default function Avatar({
  size = 40,
  name,
  imageUrl,
  onClick,
  className,
}: AvatarProps) {
  return (
    <div>
      <div
        className={cn(
          'flex cursor-pointer items-center justify-center rounded-full bg-primary-50 text-gray-00 title-sm-300',
          className,
        )}
        style={{
          width: size,
          height: size,
          fontSize: size / 2,
        }}
        onClick={onClick}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={name} width={size} height={size} />
        ) : (
          <span>{name.slice(0, 1)}</span>
        )}
      </div>
    </div>
  );
}
