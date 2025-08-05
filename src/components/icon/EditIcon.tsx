import { SVGProps } from 'react';

export default function EditIcon(props: SVGProps<SVGSVGElement>) {
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
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.667"
        d="M10 3.333H5.833a2.5 2.5 0 0 0-2.5 2.5v8.334a2.5 2.5 0 0 0 2.5 2.5h8.334a2.5 2.5 0 0 0 2.5-2.5V10"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.667"
        d="m17.155 4.167-7.581 7.58-1.762.441.44-1.762 7.582-7.58 1.321 1.32Z"
      />
    </svg>
  );
}
