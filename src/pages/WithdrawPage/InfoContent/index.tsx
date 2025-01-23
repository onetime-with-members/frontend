import GrayBox from './GrayBox';
import RedCheckbox from './RedCheckbox';
import withdrawClockImage from '@/assets/withdraw-clock.svg';

interface InfoContentProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InfoContent({
  isChecked,
  setIsChecked,
}: InfoContentProps) {
  function handleCheckboxClick() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-8">
        <div className="h-[160px] w-[160px]">
          <img
            src={withdrawClockImage}
            alt="깨진 시계 이미지"
            className="h-full w-full"
          />
        </div>
        <h1 className="text-gray-90 title-md-300">
          정말 서비스를 탈퇴하시겠어요?
        </h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <GrayBox
          title="회원님의 계정이 즉시 삭제돼요"
          description="탈퇴한 회원의 정보는 복구할 수 없어요. 탈퇴 후에는 회원님의 계정이 즉시 삭제돼요."
        />
        <GrayBox
          title="회원님의 일정 및 스케줄 데이터가 모두 삭제돼요"
          description="참여한 이벤트에 등록한 스케줄 등 OneTime에서 작성하신 내용이 모두 삭제돼요."
        />
        <div
          className="flex cursor-pointer items-center gap-4 rounded-xl bg-danger-10 p-4"
          onClick={handleCheckboxClick}
        >
          <RedCheckbox isChecked={isChecked} />
          <div className="text-danger-60 text-md-200">
            상기 내용을 모두 확인했습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
