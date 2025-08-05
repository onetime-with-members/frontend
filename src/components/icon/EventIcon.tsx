import { SVGProps } from 'react';

export default function EventIcon(props: SVGProps<SVGSVGElement>) {
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
        width="18"
        height="18"
        x="3"
        y="3"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        rx="4"
      />
      <path
        fill="#fff"
        d="M11.639 7.257a.4.4 0 0 1 .722 0l1.13 2.367a.4.4 0 0 0 .308.224l2.6.343a.4.4 0 0 1 .224.686l-1.903 1.806a.4.4 0 0 0-.117.363l.477 2.58a.4.4 0 0 1-.584.424l-2.305-1.251a.4.4 0 0 0-.382 0l-2.305 1.25a.4.4 0 0 1-.584-.424l.477-2.579a.4.4 0 0 0-.118-.363l-1.902-1.806a.4.4 0 0 1 .223-.686l2.6-.343a.4.4 0 0 0 .31-.224l1.129-2.367Z"
      />
    </svg>
  );
}
