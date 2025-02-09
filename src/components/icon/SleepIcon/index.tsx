interface SleepIconProps {
  fill?: string;
  size?: number;
}

export default function SleepIcon({
  fill = '#5D6279',
  size = 20,
}: SleepIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Sleep">
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.9619 12.468C18.1002 12.0214 17.6988 11.6162 17.2323 11.6475C17.0454 11.66 16.8568 11.6664 16.6667 11.6664C12.0644 11.6664 8.33341 7.93542 8.33341 3.33305C8.33341 3.14314 8.33977 2.95472 8.35227 2.76798C8.38351 2.30145 7.97835 1.90011 7.53171 2.03843C4.13446 3.0905 1.66675 6.25713 1.66675 10.0001C1.66675 14.6025 5.39771 18.3335 10.0001 18.3335C13.7433 18.3335 16.91 15.8655 17.9619 12.468Z"
          fill={fill}
        />
        <path
          id="Vector 232"
          d="M13.3333 3.33301H16.6666L13.3333 6.66634H16.6666"
          stroke={fill}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
