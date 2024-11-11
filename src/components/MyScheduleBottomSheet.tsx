import clsx from 'clsx';

import { MyNewSchedule } from '../types/schedule.type';
import MyScheduleActionButton from './MyScheduleActionButton';
import Button from './button/Button';
import Input from './form-control/input/Input';
import { IconX } from '@tabler/icons-react';

interface MyScheduleBottomSheetProps {
  onClose: () => void;
  title?: MyNewSchedule['title'];
  setTitle?: (title: MyNewSchedule['title']) => void;
  mode: 'view' | 'new';
  handleSubmit?: () => void;
  handleDeleteButtonClick?: () => void;
  handleEditButtonClick?: () => void;
  buttonDisabled?: boolean;
  overlay?: boolean;
}

export default function MyScheduleBottomSheet({
  onClose,
  title,
  setTitle,
  mode,
  handleSubmit,
  handleDeleteButtonClick,
  handleEditButtonClick,
  buttonDisabled = false,
  overlay = true,
}: MyScheduleBottomSheetProps) {
  const bottomSpacingRem = 15;

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (setTitle) setTitle(e.target.value);
  }

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-end bg-gray-90',
        {
          'bg-opacity-30': overlay,
          'bg-opacity-0': !overlay,
        },
      )}
    >
      <div
        className="relative w-full max-w-screen-sm cursor-default rounded-tl-3xl rounded-tr-3xl bg-gray-00 px-4 py-5"
        style={{
          transform: `translateY(${bottomSpacingRem}rem)`,
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="pl-2 text-gray-90 text-lg-200">스케줄 설정</h2>
            <button onClick={onClose}>
              <IconX size={24} className="text-gray-80" />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {mode === 'view' ? (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  inputMode="none"
                  readOnly
                />
              ) : (
                <Input value={title} onChange={handleTitleChange} />
              )}
              {mode === 'view' && (
                <div className="flex items-center gap-4">
                  <MyScheduleActionButton
                    action="edit"
                    onClick={handleEditButtonClick}
                  />
                  <MyScheduleActionButton
                    action="delete"
                    onClick={handleDeleteButtonClick}
                  />
                </div>
              )}
            </div>
            {mode === 'new' && (
              <Button onClick={handleSubmit} disabled={buttonDisabled}>
                저장
              </Button>
            )}
          </div>
        </div>
        <div className="w-full" style={{ height: `${bottomSpacingRem}rem` }} />
      </div>
    </div>
  );
}
