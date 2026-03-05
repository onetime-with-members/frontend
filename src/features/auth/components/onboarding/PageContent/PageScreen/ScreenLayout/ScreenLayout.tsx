import BottomButton from './BottomButton';

export default function ScreenLayout({
  title,
  disabled = false,
  onBackButtonClick,
  onSubmit,
  children,
}: {
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
        <BottomButton
          disabled={disabled}
          onBackButtonClick={onBackButtonClick}
        />
      </form>
    </section>
  );
}
