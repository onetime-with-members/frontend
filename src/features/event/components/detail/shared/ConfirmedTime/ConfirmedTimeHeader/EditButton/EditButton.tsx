import ActionButton from '../ActionButton';
import { EditIcon } from '@/components/icon';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function EditButton() {
  const params = useParams<{ id: string }>();

  const progressRouter = useProgressRouter();

  function handleClick() {
    progressRouter.push(`/events/${params.id}/confirm`);
  }

  return (
    <ActionButton onClick={handleClick}>
      <EditIcon />
    </ActionButton>
  );
}
