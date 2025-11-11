import { SVGProps } from 'react';

export function SleepTimeIcon(props: SVGProps<SVGSVGElement>) {
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
        fillRule="evenodd"
        d="M17.961 12.469c.138-.447-.263-.852-.73-.821a8.333 8.333 0 0 1-8.88-8.88c.032-.467-.373-.868-.82-.73a8.333 8.333 0 1 0 10.43 10.43Z"
        clipRule="evenodd"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.667"
        d="M13.333 3.333h3.333l-3.333 3.333h3.333"
      />
    </svg>
  );
}
