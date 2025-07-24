export default function HumanIcon({ fill = '#16B18C' }: { fill?: string }) {
  return (
    <div className="flex h-[18px] w-[18px] items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="13"
        viewBox="0 0 10 13"
        fill="none"
      >
        <circle cx="5.00026" cy="3.52046" r="2.87562" fill={fill} />
        <path
          d="M5.00029 7.17914C7.39568 7.17914 9.24597 9.10281 9.55595 11.6069C9.60683 12.0179 9.26602 12.3549 8.85185 12.3549H1.1497C0.735509 12.3549 0.394716 12.0179 0.445601 11.6069C0.755564 9.10297 2.60512 7.17938 5.00029 7.17914Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
