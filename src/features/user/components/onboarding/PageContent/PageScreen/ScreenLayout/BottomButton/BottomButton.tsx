import BottomButtomDesktop from './BottomButtonDesktop';
import BottomButtomMobile from './BottomButtonMobile';

export default function BottomButton({
  pageIndex,
  disabled = false,
  onBackButtonClick,
}: {
  pageIndex: number;
  disabled?: boolean;
  onBackButtonClick: () => void;
}) {
  return (
    <>
      <BottomButtomMobile disabled={disabled} />
      <BottomButtomDesktop
        disabled={disabled}
        onBackButtonClick={onBackButtonClick}
        pageIndex={pageIndex}
      />
    </>
  );
}
