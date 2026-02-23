import { useState } from 'react';

import ConfirmedTimePicker from './ConfirmedTimePicker';
import PanelHeading from './PanelHeading';

export default function LeftPanel() {
  const [activePicker, setActivePicker] = useState<'start' | 'end' | 'none'>(
    'none',
  );

  return (
    <div className="flex w-full flex-col gap-3 bg-white px-4 pt-4 md:w-[442px] md:rounded-3xl md:p-6">
      <div className="flex flex-col gap-2 rounded-2xl bg-transparent md:gap-3 md:p-0">
        <PanelHeading />
        <div className="grid grid-cols-2 gap-3">
          <ConfirmedTimePicker
            type="start"
            isOpen={activePicker === 'start'}
            setIsOpen={(isOpen: boolean) =>
              setActivePicker(isOpen ? 'start' : 'none')
            }
          />
          <ConfirmedTimePicker
            type="end"
            isOpen={activePicker === 'end'}
            setIsOpen={(isOpen: boolean) =>
              setActivePicker(isOpen ? 'end' : 'none')
            }
          />
        </div>
      </div>
    </div>
  );
}
