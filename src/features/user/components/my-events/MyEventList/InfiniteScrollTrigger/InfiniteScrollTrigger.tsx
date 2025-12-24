import { InViewHookResponse } from 'react-intersection-observer';

export default function InfiniteScrollTrigger({
  ref,
}: {
  ref: InViewHookResponse['ref'];
}) {
  return <div ref={ref} className="h-8 w-full" />;
}
