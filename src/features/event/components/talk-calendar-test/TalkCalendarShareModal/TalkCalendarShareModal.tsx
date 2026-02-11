'use client';

import CloseButton from './CloseButton';
import ImageContent from './ImageContent';
import ShareButton from './ShareButton';
import TextContent from './TextContent';

export default function TalkCalendarShareModal() {
  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
      data-testid="schedule-guide-modal"
    >
      <div
        className="relative flex w-full max-w-[328px] cursor-auto flex-col overflow-hidden rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 px-4 pb-6 pt-8">
          <CloseButton />
          <ImageContent />
          <TextContent />
        </div>
        <div className="p-3 pt-0">
          <ShareButton />
        </div>
      </div>
    </div>
  );
}
