import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForDesktopProps {
  onClick: () => void;
}

export default function BottomButtonForDesktop({
  onClick,
}: BottomButtonForDesktopProps) {
  return (
    <div className="hidden md:block">
      <FloatingBottomButton variant="dark" onClick={onClick}>
        스케줄 등록
      </FloatingBottomButton>
    </div>
  );
}
