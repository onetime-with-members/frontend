import { useRouter } from '@/i18n/navigation';
import { IconX } from '@tabler/icons-react';

export default function TopAppBar() {
  const router = useRouter();

  return (
    <header className="h-[4rem]">
      <div className="fixed h-[4rem] w-full bg-gray-00 px-4">
        <div className="mx-auto w-full max-w-screen-sm">
          <div className="flex w-full items-center justify-end py-5">
            <button onClick={() => router.back()}>
              <IconX size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
