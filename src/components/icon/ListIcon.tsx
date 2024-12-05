interface ListIconProps {
  fill?: string;
}

export default function ListIcon({ fill = '#677CEE' }: ListIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect x="3" y="13.5" width="18" height="7.5" rx="2" fill={fill} />
      <rect x="3" y="3" width="18" height="7.5" rx="2" fill={fill} />
    </svg>
  );
}
