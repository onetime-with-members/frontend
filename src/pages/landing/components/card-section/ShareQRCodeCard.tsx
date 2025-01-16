import cardImage from '../../../../assets/landing/paper-airplane.svg';
import Card from './Card';

export default function ShareQRCodeCard() {
  return (
    <Card
      title={
        <>
          오프라인에서는 QR코드로 <br className="hidden min-[300px]:block" />
          쉽고 빠른 일정관리
        </>
      }
      badgeTitle="QR 코드 생성"
      description={
        <>
          오프라인에서는 링크 공유 필요 없이{' '}
          <br className="hidden min-[300px]:block" />
          QR코드 하나로 시간을 조율해보세요.
        </>
      }
      image={
        <div className="h-[260px]">
          <div className="absolute -left-4 bottom-0">
            <img src={cardImage} alt="날아가는 종이 비행기 이미지" />
          </div>
        </div>
      }
      style={{
        background: 'linear-gradient(180deg, #8898F2 0%, #4C65E5 100%)',
      }}
    />
  );
}
