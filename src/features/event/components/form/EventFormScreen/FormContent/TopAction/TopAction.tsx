import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function TopAction() {
  const router = useRouter();

  return (
    <div className="hidden w-full items-center justify-start pb-6 md:flex">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center justify-center"
      >
        <IconChevronLeft size={24} />
      </button>
    </div>
  );
}
