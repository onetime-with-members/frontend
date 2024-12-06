import logoWhite from '../assets/logo-white.svg';
import { EventType } from '../types/event.type';

interface QRCodeScreenProps {
  visible?: boolean;
  event: EventType;
}

export default function QRCodeScreen({
  // visible = false,
  event,
}: QRCodeScreenProps) {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-00"
      style={{
        background: 'linear-gradient(180deg, #8898F2 0%, #4C65E5 100%)',
      }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="w-[15rem]">
          <img
            src={logoWhite}
            alt="OneTime 로고"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-[280px] w-[280px] rounded-3xl bg-gray-00"></div>
        <p className="text-center text-primary-10 title-sm-300">
          <span className="text-primary-00">{event.title}</span>에<br />
          스케줄을 등록해 주세요!
        </p>
      </div>
    </div>
  );
}
