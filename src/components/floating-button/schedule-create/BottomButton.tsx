import clsx from 'clsx';

interface BottomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function BottomButton({
  children,
  className,
  ...rest
}: BottomButtonProps) {
  return (
    <div className="fixed bottom-4 left-0 w-full px-4">
      <div className="mx-auto w-full max-w-screen-sm">
        <button
          className={clsx(
            'title-sm-200 w-full rounded-2xl bg-primary-50 px-4 py-4 text-gray-00 disabled:bg-gray-10 disabled:text-gray-60',
            className,
          )}
          {...rest}
        >
          {children}
        </button>
      </div>
    </div>
  );
}
