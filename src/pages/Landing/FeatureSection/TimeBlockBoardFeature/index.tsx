import featureImage from '../../../../assets/landing/time-block-board.png';
import Feature from '../Feature';

export default function TimeBlockBoardFeature() {
  return (
    <Feature
      title={
        <>
          가능한 시간은 더 명확하게{' '}
          <br className="hidden min-[320px]:block md:hidden" />
          선택은 더 간편하게
        </>
      }
      badgeTitle="간편한 가능시간 체크"
      description={
        <>
          가능한 시간을 가늠하기 어려우신가요?{' '}
          <br className="hidden min-[320px]:block" />
          그렇다면 ‘안되는 시간’을 지워보세요.
        </>
      }
      image={
        <div className="min-[20rem]:w-[20rem]">
          <img
            src={featureImage}
            alt="타임블록 되는 시간 및 안되는 시간 UI 이미지"
            className="h-full w-full"
          />
        </div>
      }
    />
  );
}
