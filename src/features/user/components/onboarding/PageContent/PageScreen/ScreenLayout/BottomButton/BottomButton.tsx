import BottomButtomDesktop from './BottomButtonDesktop';
import BottomButtomMobile from './BottomButtonMobile';

export default function BottomButton({
  disabled = false,
  onBackButtonClick,
}: {
  disabled?: boolean;
  onBackButtonClick: () => void;
}) {
  return (
    <>
      <BottomButtomMobile disabled={disabled} />
      <BottomButtomDesktop
        disabled={disabled}
        onBackButtonClick={onBackButtonClick}
      />
    </>
  );
}
