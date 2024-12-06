interface TimeBlockIconProps {
  fill?: string;
  size?: number;
}

export default function TimeBlockIcon({
  fill = '#677CEE',
  size = 24,
}: TimeBlockIconProps) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
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
    </span>
  );
}
