interface TimeBlockIconProps {
  fill?: string;
}

export default function TimeBlockIcon({
  fill = '#677CEE',
}: TimeBlockIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="13.5"
        y="21"
        width="18"
        height="7.5"
        rx="2"
        transform="rotate(-90 13.5 21)"
        fill={fill}
      />
      <rect
        x="3"
        y="21"
        width="18"
        height="7.5"
        rx="2"
        transform="rotate(-90 3 21)"
        fill={fill}
      />
    </svg>
  );
}
