export default function EditIcon({
  fill = '#1B1C23',
  size = 24,
}: {
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <path
        d="M13 4.66666H7.79163C6.06574 4.66666 4.66663 6.06577 4.66663 7.79166V18.2083C4.66663 19.9342 6.06574 21.3333 7.79163 21.3333H18.2083C19.9342 21.3333 21.3333 19.9342 21.3333 18.2083V13"
        stroke={fill}
        strokeWidth="2.08333"
        strokeLinecap="round"
      />
      <path
        d="M21.9437 5.70834L12.4672 15.1849L10.265 15.7347L10.8158 13.5326L20.2914 4.056L21.9437 5.70834Z"
        fill={fill}
        stroke={fill}
        strokeWidth="2.08333"
        strokeLinecap="round"
      />
    </svg>
  );
}
