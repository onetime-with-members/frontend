export default function LoadIcon({
  size = 16,
  fill = '#FFFFFF',
}: {
  size?: number;
  fill?: string;
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
        d="M2 9L2 12C2 13.1046 2.89543 14 4 14L12 14C13.1046 14 14 13.1046 14 12L14 9"
        stroke={fill}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.9987 2L7.9987 10.6667M7.9987 10.6667L10.6654 8.05128M7.9987 10.6667L5.33203 8.05128"
        stroke={fill}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
