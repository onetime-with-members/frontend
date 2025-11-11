import { useContext } from 'react';

import BlockContent from './BlockContent';
import DateIndicator from './DateIndicator';
import TimeIndicator from './TimeIndicator';
import { MyTimeBlockBoardContext } from '@/features/my-schedule/contexts/MyTimeBlockBoardContext';

export default function MyTimeBlockBoardContent() {
  const { className } = useContext(MyTimeBlockBoardContext);

  return (
    <div className={className}>
      <div className="flex flex-col">
        <DateIndicator />
        <div className="flex flex-1">
          <TimeIndicator />
          <BlockContent />
        </div>
      </div>
    </div>
  );
}
