interface ProfileIconProps {
  fill?: string;
  innerFill?: string;
  size?: number;
}

export default function ProfileIcon({
  fill = '#4C65E5',
  innerFill = '#FFFFFF',
  size = 20,
}: ProfileIconProps) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill={fill} />
        <mask
          id="mask0_1413_1215"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <circle cx="10" cy="10" r="10" fill={innerFill} />
        </mask>
        <g mask="url(#mask0_1413_1215)">
          <circle cx="10" cy="7.65887" r="3.83416" fill={innerFill} />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.86536 19.4385C3.86542 15.6269 6.49454 12.5371 10 12.5371C13.5055 12.5371 16.1346 15.6269 16.1347 19.4385H16.1347V20.5688H3.86536V19.4386C3.86536 19.4386 3.86536 19.4385 3.86536 19.4385Z"
            fill={innerFill}
          />
        </g>
      </svg>
    </span>
  );
}
