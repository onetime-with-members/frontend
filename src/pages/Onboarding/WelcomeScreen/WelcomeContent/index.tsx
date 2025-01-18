import clock from '@/assets/welcome-clock.svg';

interface WelcomeContentProps {
  name: string;
}

export default function WelcomeContent({ name }: WelcomeContentProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div>
        <img src={clock} alt="시계 이미지" className="h-[10rem] w-[10rem]" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-center text-[2rem] font-bold text-gray-90">
          환영합니다,
          <br className="block md:hidden" />
          {name}님!
        </h1>
        <p className="text-gray-90 text-lg-200">
          지금부터 OneTime을 사용해볼까요?
        </p>
      </div>
    </div>
  );
}
