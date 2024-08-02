import { useState } from 'react';

import ScheduleAddDialog from '../../ScheduleAddDialog';
import { IconPlus } from '@tabler/icons-react';

export default function FloatingButtonSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleButtonClick() {
    setIsDialogOpen(true);
  }

  function handleDialogConfirm() {
    setIsDialogOpen(false);
  }

  function handleDialogCancel() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <section className="fixed bottom-8 left-0 flex w-full justify-center">
        <button
          className="flex items-center gap-1 rounded-full bg-gray-90 px-6 py-3 text-gray-00"
          onClick={handleButtonClick}
        >
          <span className="text-md-200">스케줄 등록</span>
          <IconPlus size={20} />
        </button>
      </section>
      {isDialogOpen && (
        <ScheduleAddDialog
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
        />
      )}
    </>
  );
}
