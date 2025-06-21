export default function EditIcon({
  fill = '#1B1C23',
  size = 24,
}: {
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Write">
        <path
          id="Vector 45"
          d="M12 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V12"
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          id="Vector 46"
          d="M11.4888 14.097L9.37437 14.6256L9.90296 12.5112L19 3.41421L20.5858 5L11.4888 14.097Z"
          fill={fill}
          stroke={fill}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
