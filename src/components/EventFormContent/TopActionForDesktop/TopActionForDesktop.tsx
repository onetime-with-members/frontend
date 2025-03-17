import { useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function TopActionForDesktop() {
  const router = useRouter();

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <div className="hidden w-full items-center justify-start pb-6 md:flex">
      <button
        onClick={handleBackButtonClick}
        className="flex items-center justify-center"
      >
        <IconChevronLeft size={24} />
      </button>
    </div>
  );
}
