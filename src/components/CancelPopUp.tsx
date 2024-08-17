interface CancelPopUpProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelPopUp({ onConfirm, onClose }: CancelPopUpProps) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex h-[12rem] w-[23rem] flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 pb-8 pt-10">
          <p className="flex flex-col items-center justify-center">
            <span className="text-lg-200 text-gray-60">
              입력한 내용이 저장되지 않았어요
            </span>
            <strong className="title-sm-300 mt-1 text-gray-80">
              정말로 페이지에서 나가시겠어요?
            </strong>
          </p>
        </div>
        <div className="flex items-center">
          <button
            className="text-lg-200 flex-1 bg-gray-05 px-3 py-4 text-gray-80"
            onClick={onConfirm}
          >
            나가기
          </button>
          <button
            className="text-lg-200 flex-1 bg-primary-50 px-3 py-4 text-gray-00"
            onClick={onClose}
          >
            머무르기
          </button>
        </div>
      </div>
    </div>
  );
}
