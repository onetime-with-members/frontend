interface SpeakerPhoneIconProps {
  fill?: string;
  size?: number;
}

export default function SpeakerPhoneIcon({
  fill = '#FFFFFF',
  size = 16,
}: SpeakerPhoneIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M5.18793 10.8843L6.16062 14.5144C6.25591 14.8701 6.62147 15.0811 6.97712 14.9858L8.12417 14.6785C8.5303 14.5696 8.73552 14.1166 8.54949 13.7395L7.05805 10.7166"
        stroke={fill}
        strokeWidth="1.33333"
      />
      <path
        d="M2.33014 7.94894C2.04425 6.88201 2.67742 5.78534 3.74435 5.49945L6.31214 4.81141L7.86506 10.607L5.29727 11.295C4.23033 11.5809 3.13366 10.9477 2.84778 9.88079L2.33014 7.94894Z"
        stroke={fill}
        strokeWidth="1.33333"
      />
      <path
        d="M6.44548 5.27411C6.28568 4.67773 6.55622 4.04965 7.09937 3.75607L10.1137 2.12673C10.8714 1.71719 11.8127 2.12268 12.0356 2.95458L13.75 9.35275C13.9729 10.1847 13.3604 11.0065 12.4995 11.0307L9.07434 11.1268C8.45717 11.1441 7.90884 10.7354 7.74904 10.1391L6.44548 5.27411Z"
        stroke={fill}
        strokeWidth="1.33333"
      />
    </svg>
  );
}
