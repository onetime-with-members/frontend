import arrow from '../../assets/landing/arrow.svg';
import calendarIcon from '../../assets/landing/calendar-icon.svg';
import clockIcon from '../../assets/landing/clock-icon.svg';
import typo1 from '../../assets/landing/typo1.svg';
import typo2 from '../../assets/landing/typo2.svg';
import typo3 from '../../assets/landing/typo3.svg';
import TypoWrapper from '../TypoWrapper';

export default function TypoSection() {
  return (
    <section className="mt-[5.5rem] flex flex-col items-center">
      <div className="flex w-[17rem] flex-col gap-10">
        <TypoWrapper>
          <div>
            <img src={typo1} alt="일정 조율의" />
          </div>
          <div>
            <img src={calendarIcon} alt="캘린더 아이콘" />
          </div>
        </TypoWrapper>
        <TypoWrapper>
          <div>
            <img src={typo2} alt="시작은" />
          </div>
          <div>
            <img src={arrow} alt="오른쪽 화살표" />
          </div>
        </TypoWrapper>
        <TypoWrapper>
          <div>
            <img src={typo3} alt="원타임에서!" />
          </div>
          <div>
            <img src={clockIcon} alt="시계 아이콘" />
          </div>
        </TypoWrapper>
      </div>
    </section>
  );
}
