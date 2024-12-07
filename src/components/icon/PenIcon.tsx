interface PenIconProps {
  fill?: string;
  size?: number;
}

export default function PenIcon({ fill = '#FFFFFF', size = 28 }: PenIconProps) {
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.1339 7.96649C23.5895 8.4221 23.5895 9.16079 23.1339 9.6164L22.1087 10.6415C21.6531 11.0972 20.9144 11.0972 20.4588 10.6415L17.9839 8.16667C17.5283 7.71106 17.5283 6.97237 17.9839 6.51676L19.0091 5.49161C19.4647 5.036 20.2034 5.036 20.659 5.49161L23.1339 7.96649ZM18.8089 13.9414C19.2645 13.4858 19.2645 12.7471 18.8089 12.2915L16.334 9.81659C15.8784 9.36098 15.1397 9.36097 14.6841 9.81659L7.6544 16.8463C7.52633 16.9743 7.42984 17.1305 7.37257 17.3023L6.13513 21.0146C5.83111 21.9267 6.69881 22.7944 7.61086 22.4903L11.3232 21.2529C11.495 21.1956 11.6511 21.0991 11.7792 20.9711L18.8089 13.9414Z"
          fill={fill}
        />
      </svg>
    </span>
  );
}
