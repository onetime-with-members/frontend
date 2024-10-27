import { IconPlus } from '@tabler/icons-react';

interface BlackFloatingBottomButtonProps {
  onClick: () => void;
  name: string;
}

export default function BlackFloatingBottomButton({
  onClick,
  name,
}: BlackFloatingBottomButtonProps) {
  return (
    <>
      <section className="fixed bottom-8 left-0 flex w-full justify-center">
        <button
          onClick={onClick}
          className="flex items-center gap-1 rounded-full bg-gray-90 px-6 py-3 text-gray-00"
        >
          <span className="text-md-200">{name}</span>
          <IconPlus size={20} />
        </button>
      </section>
    </>
  );
}
