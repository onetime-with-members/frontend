import recommendTime from '../../../assets/landing/recommend-time.png';

export default function CardSection() {
  return (
    <div className="mx-auto mt-10 flex w-[342px] justify-center">
      <div className="relative flex w-full flex-col items-center gap-10 rounded-2xl bg-primary-00 px-6 pb-7 pt-10">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[1.75rem] font-bold text-primary-50">
            빠른 현황 확인
          </h2>
          <p className="text-primary-30 text-lg-200">
            이벤트 참여자와 가장 많은 사람들이
            <br />
            되는 시간을 빠르게 확인할 수 있어요
          </p>
        </div>
        <div className="h-[15rem]">
          <div className="absolute left-6 z-10">
            <img
              src={recommendTime}
              alt="추천 시간 UI"
              className="w-[232px] rounded-xl"
              style={{
                boxShadow: '4px 4px 16px 0px rgba(103, 124, 238, 0.20)',
              }}
            />
          </div>
          <div className="absolute right-6 translate-y-10">
            <div
              className="h-[198px] w-[259px] rounded-xl"
              style={{
                background:
                  'linear-gradient(180deg, rgba(232, 235, 252, 0.00) 58.84%, #E8EBFC 98.48%), url(/src/assets/landing/participants.png) lightgray 50% / cover no-repeat',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
