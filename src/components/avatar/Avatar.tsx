import avatarDefault from '../../assets/avatar-default.png';

interface AvatarProps {
  size?: number;
}

export default function Avatar({ size = 32 }: AvatarProps) {
  return (
    <div
      className="overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
      }}
    >
      <img src={avatarDefault} alt="기본 프로필 이미지" />
    </div>
  );
}
