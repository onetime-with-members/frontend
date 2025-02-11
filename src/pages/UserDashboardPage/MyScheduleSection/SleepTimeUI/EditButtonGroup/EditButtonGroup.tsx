import SmallButton from '@/components/button/SmallButton/SmallButton';

interface EditButtonGroupProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export default function EditButtonGroup({
  onSubmit,
  onCancel,
}: EditButtonGroupProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <SmallButton variant="primary" onClick={onSubmit}>
        완료
      </SmallButton>
      <SmallButton variant="gray" onClick={onCancel}>
        취소
      </SmallButton>
    </div>
  );
}
