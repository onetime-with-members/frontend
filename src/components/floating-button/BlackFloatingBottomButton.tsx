import { IconPlus } from '@tabler/icons-react';

interface BlackFloatingBottomButtonProps {
  onClick: () => void;
}

export default function BlackFloatingBottomButton({
  onClick,
}: BlackFloatingBottomButtonProps) {
  return (
    <>
      <section className="fixed bottom-8 left-0 flex w-full justify-center">
        <button
          onClick={onClick}
          className="flex items-center gap-1 rounded-full bg-gray-90 px-6 py-3 text-gray-00"
        >
          <span className="text-md-200">스케줄 등록</span>
          <IconPlus size={20} />
        </button>
      </section>
    </>
  );
}
