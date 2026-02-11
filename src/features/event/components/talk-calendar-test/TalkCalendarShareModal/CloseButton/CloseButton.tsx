import { useProgressRouter } from '@/navigation';
import { IconX } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function CloseButton() {
  const params = useParams<{ id: string }>();

  const progressRouter = useProgressRouter();

  function handleClose() {
    progressRouter.push(`/events/view/${params.id}`);
  }

  return (
    <button
      className="absolute right-4 top-4 text-xs text-gray-40"
      onClick={handleClose}
    >
      <IconX />
    </button>
  );
}
