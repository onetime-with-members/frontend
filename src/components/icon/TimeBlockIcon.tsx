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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <rect
          x="13.0273"
          y="14.5039"
          width="11.0039"
          height="7.97266"
          rx="1.5"
          transform="rotate(-90 13.0273 14.5039)"
          fill={fill}
        />
        <rect
          x="13.0273"
          y="21.4492"
          width="4.948"
          height="7.97266"
          rx="1.5"
          transform="rotate(-90 13.0273 21.4492)"
          fill={fill}
        />
        <rect
          x="3"
          y="21.4441"
          width="17.9441"
          height="7.99512"
          rx="1.5"
          transform="rotate(-90 3 21.4441)"
          fill={fill}
        />
      </svg>
    </span>
  );
}
