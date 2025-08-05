import { SVGProps } from 'react';

export default function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 20 21"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.694 12.186a6.602 6.602 0 1 1-13.204 0 6.602 6.602 0 0 1 13.204 0Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.111 16.71a4.51 4.51 0 1 0 0-9.021 4.51 4.51 0 0 0 0 9.02Zm0 2.122a6.633 6.633 0 1 0 0-13.266 6.633 6.633 0 0 0 0 13.266Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M3.175 4.076a3.068 3.068 0 0 0-.762 3.832c.153.283.526.319.775.115l3.852-3.14c.25-.204.29-.577.043-.783a3.068 3.068 0 0 0-3.908-.024ZM17.069 4.076a3.069 3.069 0 0 1 .762 3.832c-.153.283-.526.319-.775.115l-3.852-3.14c-.25-.204-.29-.576-.043-.783a3.069 3.069 0 0 1 3.908-.024Z"
      />
      <rect
        width="1.415"
        height="3.368"
        x="12.404"
        y="13.569"
        fill="#fff"
        rx=".708"
        transform="rotate(135 12.404 13.57)"
      />
      <rect
        width="1.415"
        height="4.157"
        x="9.334"
        y="8.712"
        fill="#fff"
        rx=".708"
      />
    </svg>
  );
}
