import GuideImage from './GuideImage/GuideImage';
import Indicator from './Indicator';
import NextButton from './NextButton';
import TextContent from './TextContent';

export default function GuideModal() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4">
      <div
        className="flex w-full max-w-[328px] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <GuideImage />
        <div className="flex flex-col items-center p-4">
          <Indicator />
          <TextContent />
          <NextButton />
        </div>
      </div>
    </div>
  );
}
