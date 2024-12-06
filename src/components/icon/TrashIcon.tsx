interface TrashIconProps {
  fill?: string;
  innerFill?: string;
}

export default function TrashIcon({
  fill = '#1B1C23',
  innerFill = '#FFFFFF',
}: TrashIconProps) {
  return (
    <svg viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Trash">
        <path
          id="Vector 39"
          d="M5.5 7.5V15C5.5 16.3807 6.61929 17.5 8 17.5H13C14.3807 17.5 15.5 16.3807 15.5 15V7.5C15.5 6.11929 14.3807 5 13 5H8C6.61929 5 5.5 6.11929 5.5 7.5Z"
          fill={fill}
          stroke={fill}
          strokeWidth="1.66667"
        />
        <path
          id="Vector 43"
          d="M8.83398 10V13.3333M12.1673 10V13.3333"
          stroke={innerFill}
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
        <path
          id="Vector 40"
          d="M8 5V4.16667C8 3.24619 8.74619 2.5 9.66667 2.5H11.3333C12.2538 2.5 13 3.24619 13 4.16667V5"
          stroke={fill}
          strokeWidth="1.66667"
        />
        <path
          id="Vector 41"
          d="M4.66602 5.83325L16.3327 5.83325"
          stroke={fill}
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
        <path
          id="Vector 42"
          d="M4.66602 5.83325V5.83325C4.66602 5.37301 5.03911 4.99992 5.49935 4.99992H15.4993C15.9596 4.99992 16.3327 5.37301 16.3327 5.83325V5.83325"
          stroke={fill}
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
