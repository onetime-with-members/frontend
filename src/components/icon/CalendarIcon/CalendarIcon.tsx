import { SVGProps } from 'react';

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect
        width="16"
        height="15"
        x="4"
        y="5"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        rx="3"
      />
      <path stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M8 9h8" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7 5V3m10 2V3"
      />
    </svg>
  );
}
