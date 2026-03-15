import ModalButton from "@/features/event/components/confirm/ActionConfirmModal/ModalButton/ModalButton";
import { useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface CompleteModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel?: () => void;
}
export default function CompleteModal({
  isOpen,
  onClose,
  onCancel,
}: CompleteModalProps) {
  const router = useRouter();
  const t = useTranslations("auth.pages.OnboardingPage");

  const handleRegisterClick = () => {
    onClose?.();
    router.push("/mypage/schedules");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
       <div className="relative flex w-full max-w-[328px] flex-col overflow-hidden rounded-xl bg-gray-00">
        <Image
          src="/images/popup-modal.png"
          alt="Signup-Popup-Modal"
          width={328}
          height={328}
          className="h-full w-full object-cover"
        />
        <div className="flex px-4 py-6 flex-col gap-1 items-center justify-center">
          <span  className="text-gray-80 text-center text-lg-300">알바, 학교 시간표를 <br />
          원타임에 등록해 보세요!</span>
          <span className="text-gray-50 text-center text-md-200">일정을 조율할 때 불러올 수 있어요</span>
        </div>

        <div className="flex px-3 pb-[10px] w-full flex-col gap-3 justify-center items-center">
          <ModalButton
            variant="primary"
            onClick={handleRegisterClick}
            className="w-full"
          >
            {t("register")}
          </ModalButton>
          <button
            type="button"
            onClick={() => onCancel?.()}
            className="text-gray-40 text-center text-sm-200"
          >
            다음에 할래요
          </button>
        </div>
       </div>
    </div>
  );
}
