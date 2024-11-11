interface AvatarProps {
  size?: number;
  name: string;
  imageUrl?: string;
  onClick?: () => void;
}

export default function Avatar({
  size = 40,
  name,
  imageUrl,
  onClick,
}: AvatarProps) {
  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-center rounded-full bg-primary-50 text-gray-00 title-sm-300"
        style={{
          width: size,
          height: size,
          fontSize: size / 2,
        }}
        onClick={onClick}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} />
        ) : (
          <span>{name.slice(0, 1)}</span>
        )}
      </div>
    </div>
  );
}
