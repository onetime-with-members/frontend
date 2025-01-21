import FloatingBottomButton from '@/components/floating-button/FloatingBottomButton';

interface BottomButtonForDesktopProps {
  onClick: () => void;
}

export default function BottomButtonForDesktop({
  onClick,
}: BottomButtonForDesktopProps) {
  return (
    <div className="hidden md:block">
      <FloatingBottomButton variant="black" onClick={onClick}>
        스케줄 등록
      </FloatingBottomButton>
    </div>
  );
}
