'use client';

import { useCallback, useRef, type Dispatch, type SetStateAction } from 'react';

import cn from '@/lib/cn';
import Image from 'next/image';

export const MY_SCHEDULE_REQUEST_MODAL_SLIDES = [
  { src: '/images/popup-modal.png', messageKey: 'slideGeneral' },
  { src: '/images/everytime-modal.png', messageKey: 'slideEverytime' },
] as const;

type Props = {
  slideIndex: number;
  setSlideIndex: Dispatch<SetStateAction<number>>;
};

export default function MyScheduleRequestModalCarousel({
  slideIndex,
  setSlideIndex,
}: Props) {
  const touchStartX = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setSlideIndex((i) =>
      Math.min(i + 1, MY_SCHEDULE_REQUEST_MODAL_SLIDES.length - 1),
    );
  }, [setSlideIndex]);

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(i - 1, 0));
  }, [setSlideIndex]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta < -48) goNext();
    else if (delta > 48) goPrev();
  }

  return (
    <div
      className="touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${slideIndex * 100}%)`,
          }}
        >
          {MY_SCHEDULE_REQUEST_MODAL_SLIDES.map((slide) => (
            <div
              key={slide.src}
              className="w-full shrink-0"
            >
              <Image
                src={slide.src}
                alt=""
                width={328}
                height={328}
                className="h-auto w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-center gap-1 py-3"
        role="tablist"
        aria-label="모달 슬라이드"
      >
        {MY_SCHEDULE_REQUEST_MODAL_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === slideIndex}
            aria-label={`슬라이드 ${i + 1}`}
            className={cn(
              'transition-all duration-300',
              i === slideIndex
                ? 'h-1.5 w-5 rounded-full bg-primary-50'
                : 'h-1.5 w-1.5 rounded-full bg-primary-10',
            )}
            onClick={() => setSlideIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
