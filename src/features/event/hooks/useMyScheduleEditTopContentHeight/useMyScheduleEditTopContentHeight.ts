export default function useMyScheduleEditTopContentHeight(
  { isAccordionOpen }: { isAccordionOpen: boolean },
  callback: (heights: {
    appBar: number;
    everytime: number;
    sleepTime: number;
  }) => number,
) {
  const appBar = 64;
  const everytime = 56;
  const sleepTime = isAccordionOpen ? 116 : 56;

  return callback({
    appBar,
    everytime,
    sleepTime,
  });
}
