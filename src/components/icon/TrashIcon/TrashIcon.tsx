import { SVGProps } from 'react';

export function TrashIcon(
  props: SVGProps<SVGSVGElement> & {
    innerfill: string;
  },
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.667"
        d="M5 7.5V15a2.5 2.5 0 0 0 2.5 2.5h5A2.5 2.5 0 0 0 15 15V7.5A2.5 2.5 0 0 0 12.5 5h-5A2.5 2.5 0 0 0 5 7.5Z"
      />
      <path
        stroke={props.innerfill}
        strokeLinecap="round"
        strokeWidth="1.667"
        d="M8.333 10v3.333M11.667 10v3.333"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.667"
        d="M7.5 5v-.833c0-.92.746-1.667 1.667-1.667h1.666c.92 0 1.667.746 1.667 1.667V5"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.667"
        d="M4.167 5.833h11.666M4.167 5.833v0C4.167 5.373 4.54 5 5 5h10c.46 0 .833.373.833.833v0"
      />
    </svg>
  );
}
