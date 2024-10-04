interface AvatarProps {
  size?: number;
  name: string;
  imageUrl?: string;
}

export default function Avatar({ size = 40, name, imageUrl }: AvatarProps) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-primary-50"
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <span className="text-gray-00 title-sm-300">{name.slice(0, 1)}</span>
      )}
    </div>
  );
}
