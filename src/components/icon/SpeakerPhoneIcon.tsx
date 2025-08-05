import { SVGProps } from 'react';

export default function SpeakerPhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 16 17"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.333"
        d="m5.188 10.884.973 3.63c.095.356.46.567.816.472l1.147-.308a.667.667 0 0 0 .425-.939l-1.49-3.022"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.333"
        d="M2.33 7.949a2 2 0 0 1 1.414-2.45l2.568-.688 1.553 5.796-2.568.688a2 2 0 0 1-2.45-1.414L2.33 7.949ZM6.445 5.274c-.16-.596.111-1.224.654-1.518l3.015-1.63a1.333 1.333 0 0 1 1.922.829l1.714 6.398a1.333 1.333 0 0 1-1.25 1.678l-3.426.096a1.333 1.333 0 0 1-1.325-.988L6.445 5.274Z"
      />
    </svg>
  );
}
