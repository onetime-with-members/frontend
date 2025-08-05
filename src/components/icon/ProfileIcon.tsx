import { SVGProps } from 'react';

export default function ProfileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <mask
        id="a"
        width="20"
        height="20"
        x="2"
        y="2"
        maskUnits="userSpaceOnUse"
        style={{ maskType: 'alpha' }}
      >
        <circle cx="12" cy="12" r="10" fill="#D9D9D9" />
      </mask>
      <g fill="#F6F7F8" mask="url(#a)">
        <circle cx="12" cy="9.658" r="3.834" />
        <path
          fillRule="evenodd"
          d="M5.865 21.439c0-3.812 2.63-6.902 6.135-6.902s6.135 3.09 6.135 6.902v1.13H5.865v-1.13Z"
          clipRule="evenodd"
        />
      </g>
    </svg>
  );
}
