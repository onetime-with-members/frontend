import { SVGProps } from 'react';

export default function HumanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 18 19"
      {...props}
    >
      <circle cx="9" cy="6.52" r="2.876" fill="currentColor" />
      <path
        fill="currentColor"
        d="M9 10.18c2.396 0 4.246 1.923 4.556 4.427.05.41-.29.748-.704.748H5.15c-.414 0-.755-.337-.704-.748.31-2.504 2.16-4.428 4.554-4.428Z"
      />
    </svg>
  );
}
