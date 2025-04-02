import { createPortal } from 'react-dom';

interface AlertProps {
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
  confirmText: string;
  cancelText: string;
  children: React.ReactNode;
}

export default function Alert({
  onConfirm,
  onCancel,
  onClose,
  confirmText,
  cancelText,
  children,
}: AlertProps) {
  return createPortal(
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
            className="flex-1 bg-gray-05 px-3 py-4 text-gray-40 duration-150 text-lg-200 hover:bg-gray-10 active:bg-gray-10"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className="flex-1 bg-primary-50 px-3 py-4 text-gray-00 duration-150 text-lg-200 hover:bg-primary-60 active:bg-primary-60"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('alert') as HTMLElement,
  );
}
