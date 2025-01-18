import cardImage from '../../../../assets/landing/fixed-schedule.png';
import Card from '../Card';

export default function FixedScheduleCard() {
  return (
    <Card
      title={
        <>
          단 한 번 등록으로 <br className="hidden min-[300px]:block" />
          반복 작업 없이 간편하게
        </>
      }
      badgeTitle="고정 스케줄 등록"
      description={
        <>
          내 고정 스케줄을 미리 등록하면{' '}
          <br className="hidden min-[300px]:block" />
          불가능한 시간은 자동으로 제외돼요.
        </>
      }
      image={
        <div className="mx-auto w-full max-w-[20rem]">
          <img
            src={cardImage}
            alt="고정 스케줄 UI 이미지"
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
