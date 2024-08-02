import Input from './Input';
import ScheduleInputLabel from './input-label/ScheduleInputLabel';
import PinPasswordInput from './pin-password/PinPasswordInput';
import { IconX } from '@tabler/icons-react';

interface ScheduleAddDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ScheduleAddDialog({
  onConfirm,
  onCancel,
}: ScheduleAddDialogProps) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-90 bg-opacity-50 px-6">
      <div className="w-full max-w-[22.5rem] overflow-hidden rounded-3xl bg-gray-00">
        <div className="flex flex-col">
          <div className="flex flex-col gap-8 px-4 py-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-lg-300 text-gray-90">정보 입력</h2>
                <button className="text-gray-20" onClick={onCancel}>
                  <IconX size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <ScheduleInputLabel htmlFor="name" required>
                    이름
                  </ScheduleInputLabel>
                  <Input id="name" placeholder="이름" />
                </div>
                <div className="flex flex-col gap-2">
                  <ScheduleInputLabel htmlFor="pin" required>
                    PIN
                  </ScheduleInputLabel>
                  <PinPasswordInput inputId="pin" />
                </div>
              </div>
            </div>
          </div>
          <button
            className="title-sm-200 bg-gray-90 px-4 py-4 text-gray-00"
            onClick={onConfirm}
          >
            스케줄 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
