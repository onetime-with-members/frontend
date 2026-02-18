import { IconX } from '@tabler/icons-react';

export default function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="absolute right-4 top-4 text-xs text-gray-40"
      onClick={onClick}
    >
      <IconX />
    </button>
  );
}
