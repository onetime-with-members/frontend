import { useNavigate } from 'react-router-dom';

import Button from '../../button/Button';

interface WelcomeScreenProps {
  name: string;
}

export default function WelcomeScreen({ name }: WelcomeScreenProps) {
  const navigate = useNavigate();

  function handleStartButtonClick() {
    navigate('/');
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-[22rem] flex-col items-center gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-[2rem] font-bold text-gray-90">
            환영합니다,
            <br />
            {name}님!
          </h1>
          <p className="text-lg-200 text-gray-90">
            지금부터 OneTime을 사용해볼까요?
          </p>
        </div>
        <Button onClick={handleStartButtonClick}>시작하기</Button>
      </div>
    </main>
  );
}
