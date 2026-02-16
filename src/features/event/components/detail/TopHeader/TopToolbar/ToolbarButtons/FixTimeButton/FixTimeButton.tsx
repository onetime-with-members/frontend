import SpeechBalloon from '../../../../shared/SpeechBalloon';
import { CalendarIcon } from '@/components/icon';

export default function FixTimeButton() {
  return (
    <SpeechBalloon.Container>
      <SpeechBalloon.Wrapper>
        <button className="hidden items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-gray-00 text-md-300 md:flex">
          <span>
            <CalendarIcon innerfill="#4c65e5" fontSize={24} />
          </span>
          <span>일정 확정하기</span>
        </button>
      </SpeechBalloon.Wrapper>
      <SpeechBalloon.Main
        width={315}
        offset={2}
        vertical="top"
        horizontal="right"
        variant="secondary"
      >
        일정 확정 후, 팀원들에게 일정 알림을 보낼 수 있어요
      </SpeechBalloon.Main>
    </SpeechBalloon.Container>
  );
}
