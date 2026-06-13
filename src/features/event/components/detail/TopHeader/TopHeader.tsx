import TopToolbar from './TopToolbar';
import BarBanner from '@/features/banner/components/BarBanner';
import useTopContentHeight from '@/features/event/hooks/useTopContentHeight';
import { toFixedStyle } from '@/features/event/utils';
import cn from '@/lib/cn';

export default function TopHeader() {
  const headerHeight = useTopContentHeight(
    ({ eventHeader, barBanner }) => eventHeader + barBanner,
  );

  const { className: heightClassName, style: heightStyle } =
    toFixedStyle(headerHeight);

  return (
    <header
      className={cn('flex w-full justify-center', heightClassName)}
      style={heightStyle}
    >
      <div className="fixed z-30 mx-auto w-full max-w-[calc(768px+2rem)] rounded-t-3xl bg-gray-00 duration-150">
        <TopToolbar />
        <BarBanner innnerClassName="fixed max-w-[calc(768px+2rem)] w-full" />
      </div>
    </header>
  );
}
