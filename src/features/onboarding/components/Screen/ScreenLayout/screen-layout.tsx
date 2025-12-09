import BottomButtomDesktop from './BottomButton/Desktop';
import BottomButtomMobile from './BottomButton/Mobile';

export default function ScreenLayout({
  pageIndex,
  title,
  disabled = false,
  onBackButtonClick,
  onSubmit,
  children,
}: {
  pageIndex: number;
  title: React.ReactNode;
  disabled?: boolean;
  onBackButtonClick: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <form
        onSubmit={onSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
        className="flex flex-col gap-14"
      >
        <h1 className="text-left text-gray-90 title-lg-300 md:text-center">
          {title}
        </h1>

        {children}

        {/* Bottom Button for Mobile */}
        <BottomButtomMobile disabled={disabled} />
        {/* Bottom Button for Desktop */}
        <BottomButtomDesktop
          disabled={disabled}
          onBackButtonClick={onBackButtonClick}
          pageIndex={pageIndex}
        />
      </form>
    </section>
  );
}
