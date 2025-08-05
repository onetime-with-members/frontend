import { SVGProps } from 'react';

export default function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M13 7a6 6 0 1 1-.624-2.667m0 0H9m3.376 0V1"
      />
    </svg>
  );
}
