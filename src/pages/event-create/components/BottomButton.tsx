import Button from '../../../components/button/Button';

interface BottomButtonProps {
  handleSubmit: () => void;
  disabled: boolean;
}

export default function BottomButton({
  handleSubmit,
  disabled,
}: BottomButtonProps) {
  return (
    <div className="sticky bottom-0 w-full bg-gray-00 px-4 py-4 md:static md:w-[25rem] md:bg-transparent">
      <Button onClick={handleSubmit} disabled={disabled} variant="black">
        이벤트 생성하기
      </Button>
    </div>
  );
}
