import { SVGProps } from 'react';

export default function LoadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M2 9v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9M8 2v8.667m0 0 2.667-2.616M8 10.667 5.333 8.05"
      />
    </svg>
  );
}
