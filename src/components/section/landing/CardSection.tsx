import availableTimeImage from '../../../assets/landing/available-time.png';
import paperAirplaneImage from '../../../assets/landing/paper-airplane.svg';
import recommendTimeImage from '../../../assets/landing/recommend-time.png';
import unavailableTimeImage from '../../../assets/landing/unavailable-time.png';
import LandingCard from '../../LandingCard';

export default function CardSection() {
  return (
    <section className="mt-10 flex flex-col gap-10 px-4">
      <LandingCard
        title="빠른 현황 확인"
        description={`이벤트 참여자와 가장 많은 사람들이\n되는 시간을 빠르게 확인할 수 있어요`}
        textImageGap={45}
        imageElement={
          <div className="h-[15rem]">
            <div className="absolute left-6 z-10">
              <img
                src={recommendTimeImage}
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
                    'linear-gradient(180deg, rgba(232, 235, 252, 0.00) 58.84%, #E8EBFC 98.48%), url(/images/landing/participants.png) lightgray 50% / cover no-repeat',
                }}
              />
            </div>
          </div>
        }
      />
      <LandingCard
        title="간편한 가능시간 체크"
        description={`가능한 시간을 가늠하기 어려우신가요?\n그렇다면 ‘안되는 시간’을 지워보세요`}
        textImageGap={45}
        imageElement={
          <div className="h-[15rem]">
            <div className="absolute left-6">
              <img
                src={unavailableTimeImage}
                alt="불가능 시간 UI"
                className="w-[167px] rounded-xl"
                style={{
                  boxShadow: '4px 4px 16px 0px rgba(103, 124, 238, 0.20)',
                }}
              />
            </div>
            <div className="absolute right-6 translate-y-10">
              <img
                src={availableTimeImage}
                alt="가능 시간 UI"
                className="w-[167px] rounded-xl"
                style={{
                  boxShadow: '4px 4px 16px 0px rgba(103, 124, 238, 0.20)',
                }}
              />
            </div>
          </div>
        }
      />
      <LandingCard
        variant="purple"
        title="모바일에서도 편리하게"
        description={`공유 한 번으로 멤버들과 언제 어디서든\n일정을 간편하게 조율해 보세요`}
        textImageGap={45}
        imageElement={
          <div className="h-[15rem]">
            <div className="absolute -left-0">
              <img
                src={paperAirplaneImage}
                alt="종이 비행기 그래픽"
                className="w-[275px] rounded-xl"
                style={{
                  filter:
                    'drop-shadow(-4px -2px 16px rgba(103, 124, 238, 0.15))',
                }}
              />
            </div>
          </div>
        }
      />
    </section>
  );
}
