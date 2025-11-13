export default function RoundedTriangle({
  width = 8,
  height = 6,
  fill = '#677CEE',
  className,
}: {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 8 6"
      fill="none"
      className={className}
    >
      <path
        d="M8 0H0L3.16795 4.75192C3.56377 5.34566 4.43623 5.34566 4.83205 4.75192L8 0Z"
        fill={fill}
      />
    </svg>
  );
}
