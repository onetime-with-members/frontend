export default function TrashIcon({
  fill = '#DD3C6C',
  innerFill = '#FBE9EF',
  size = 16,
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
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6V12C4 13.1046 4.89543 14 6 14H10C11.1046 14 12 13.1046 12 12V6C12 4.89543 11.1046 4 10 4H6C4.89543 4 4 4.89543 4 6Z"
        fill={fill}
        stroke={fill}
        strokeWidth="1.33333"
      />
      <path
        d="M6.66699 8V10.6667M9.33366 8V10.6667"
        stroke={innerFill}
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
      <path
        d="M6 4V3.33333C6 2.59695 6.59695 2 7.33333 2H8.66667C9.40305 2 10 2.59695 10 3.33333V4"
        stroke={fill}
        strokeWidth="1.33333"
      />
      <path
        d="M3.33301 4.66663L12.6663 4.66663"
        stroke={fill}
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
      <path
        d="M3.33301 4.66663V4.66663C3.33301 4.29844 3.63148 3.99996 3.99967 3.99996H11.9997C12.3679 3.99996 12.6663 4.29844 12.6663 4.66663V4.66663"
        stroke={fill}
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
    </svg>
  );
}
