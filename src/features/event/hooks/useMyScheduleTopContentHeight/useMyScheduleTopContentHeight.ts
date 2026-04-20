import useIsMobile from '@/hooks/useIsMobile';

export default function useMyScheduleTopContentHeight(
  callback: (heights: {
    navBar: number;
    header: number;
    sleepTime: number;
  }) => number,
) {
  const isMobile = useIsMobile();

  const navBar = 56;
  const header = !isMobile ? 58 : 0;
  const sleepTime = 56;

  return callback({
    navBar,
    header,
    sleepTime,
  });
}
