import MyScheduleActionButton from './MyScheduleActionButton';
import Button from './button/Button';
import Input from './form-control/input/Input';
import { IconX } from '@tabler/icons-react';

interface MyScheduleBottomSheetProps {
  onClose: () => void;
}

export default function MyScheduleBottomSheet({
  onClose,
}: MyScheduleBottomSheetProps) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-end justify-center bg-gray-90 bg-opacity-30">
      <div className="w-full max-w-screen-sm cursor-default rounded-tl-3xl rounded-tr-3xl bg-gray-00 px-4 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="pl-2 text-gray-90 text-lg-200">스케줄 설정</h2>
            <button onClick={onClose}>
              <IconX size={24} className="text-gray-80" />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Input placeholder="스케줄의 이름은 무엇인가요?" />
              <div className="flex items-center gap-4">
                <MyScheduleActionButton action="edit" />
                <MyScheduleActionButton action="delete" />
              </div>
            </div>
            <Button>저장</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
