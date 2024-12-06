interface ListIconProps {
  fill?: string;
  size?: number;
}

export default function ListIcon({
  fill = '#677CEE',
  size = 24,
}: ListIconProps) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13.5" width="18" height="7.5" rx="2" fill={fill} />
        <rect x="3" y="3" width="18" height="7.5" rx="2" fill={fill} />
      </svg>
    </span>
  );
}
