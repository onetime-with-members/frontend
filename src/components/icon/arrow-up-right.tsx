export default function ArrowUpRightIcon({
  fill = 'white',
  size = 16,
}: {
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3.91057 12.2778L12.2797 3.90865M12.2797 3.90865L5.84564 3.85913M12.2797 3.90865L12.3292 10.3427"
        stroke={fill}
        strokeWidth="1.82088"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
