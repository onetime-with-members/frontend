export default function CheckIcon({
  fill = '#FFFFFF',
  size = 20,
}: {
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="check">
        <path
          id="Vector 13"
          d="M3.75 9.16659L8.4375 14.1666L16.25 5.83325"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
