import { createPortal, useFormStatus } from 'react-dom';

export default function Alert({
  onConfirm,
  onCancel,
  onClose,
  confirmText,
  pendingText,
  cancelText,
  children,
}: {
  onConfirm: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onClose: () => void;
  confirmText: string;
  pendingText?: string;
  cancelText: string;
  children: React.ReactNode;
}) {
  return createPortal(
    <form onSubmit={onConfirm}>
      <div
        className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
        onClick={onClose}
      >
        <div
          className="flex w-full max-w-[23rem] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-1 px-4">{children}</div>
          <div className="flex items-center">
            <button
              type="button"
              className="flex-1 bg-gray-05 px-3 py-4 text-gray-40 duration-150 text-lg-200 hover:bg-gray-10 active:bg-gray-10"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <ConfirmButton
              confirmText={confirmText}
              pendingText={pendingText}
            />
          </div>
        </div>
      </div>
    </form>,
    document.getElementById('alert') as HTMLElement,
  );
}

function ConfirmButton({
  confirmText,
  pendingText,
}: {
  confirmText: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex-1 bg-primary-50 px-3 py-4 text-gray-00 duration-150 text-lg-200 hover:bg-primary-60 active:bg-primary-60"
    >
      {pending ? pendingText || confirmText : confirmText}
    </button>
  );
}
