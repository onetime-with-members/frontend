export default function CalendarIcon({
  fill,
  innerFill,
  size = 18,
}: {
  fill?: string;
  innerFill?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 19"
      fill="none"
    >
      <rect
        x="1"
        y="3"
        width="16"
        height="15"
        rx="3"
        fill={fill}
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M5 7L13 7"
        stroke={innerFill}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M4 3V1M14 3V1"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
