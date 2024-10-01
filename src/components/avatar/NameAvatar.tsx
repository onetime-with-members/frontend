interface NameAvatarProps {
  size?: number;
  name: string;
}

export default function NameAvatar({ size = 40, name }: NameAvatarProps) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-primary-50 text-gray-00 title-sm-300"
      style={{
        width: size,
        height: size,
        fontSize: size / 2,
      }}
    >
      {name.slice(0, 1)}
    </div>
  );
}
