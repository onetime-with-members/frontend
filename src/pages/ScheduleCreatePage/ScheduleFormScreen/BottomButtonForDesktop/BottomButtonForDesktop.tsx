import FloatingBottomButton from '@/components/button/FloatingBottomButton/FloatingBottomButton';

interface BottomButtonForDesktopProps {
  onClick: () => void;
}

export default function BottomButtonForDesktop({
  onClick,
}: BottomButtonForDesktopProps) {
  return (
    <div className="hidden sm:block">
      <FloatingBottomButton variant="dark" maxWidth={480} onClick={onClick}>
        스케줄 등록
      </FloatingBottomButton>
    </div>
  );
}
