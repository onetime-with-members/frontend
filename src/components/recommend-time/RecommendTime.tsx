import { useState } from 'react';

import RecommendTimeDialog from './RecommendTimeDialog';
import { IconChevronRight } from '@tabler/icons-react';

export default function RecommendTime() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className="min-w-[85%] cursor-pointer rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="text-md-300 text-gray-60">가장 많이 되는 시간</span>
          <IconChevronRight size={24} className="text-gray-30" />
        </div>
        <div className="text-lg-300 mt-2 rounded-2xl bg-primary-00 p-4 text-primary-50">
          <span>2024.03.01 월</span>
          <span className="ml-2">18:00 - 20:00</span>
        </div>
      </div>
      {isDialogOpen && <RecommendTimeDialog onClose={handleDialogClose} />}
    </>
  );
}
