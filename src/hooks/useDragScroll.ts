import React, { useEffect, useState } from 'react';

interface useDragScrollProps {
  ref: React.RefObject<HTMLElement | null>;
}

type DragX = {
  init: number;
  min: number;
  max: number;
};

export default function useDragScroll({ ref }: useDragScrollProps) {
  const [scrollContainerRef, setScrollContainerRef] =
    useState<React.RefObject<HTMLElement | null>>();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragX, setDragX] = useState<DragX>({
    init: 0,
    min: 0,
    max: 0,
  });
  const [initScrollLeft, setInitScrollLeft] = useState<number>(0);
  const [isDragEvent, setIsDragEvent] = useState<boolean>(false);

  // [수정] 마우스와 터치 이벤트에서 공통으로 clientX를 추출하는 헬퍼 함수
  const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
    // 터치 이벤트인 경우 e.touches[0].clientX 사용
    if ('touches' in e) {
      return e.touches[0].clientX;
    }
    // 마우스 이벤트인 경우 e.clientX 사용
    return e.clientX;
  };

  // [수정] 이벤트 타입을 MouseEvent | TouchEvent로 확장
  function handleDragStart(e: React.MouseEvent | React.TouchEvent) {
    if (!scrollContainerRef?.current) return;

    // 마우스 이벤트의 경우에만 preventDefault를 호출하여 텍스트 선택 방지
    // 터치 이벤트에서는 기본 동작(예: 페이지 스크롤)을 막지 않도록 함
    if (!('touches' in e)) {
      e.preventDefault();
    }

    setIsDragging(true);
    const startX = getClientX(e); // [수정] 헬퍼 함수 사용
    setDragX({
      init: startX,
      min: startX,
      max: startX,
    });
    setInitScrollLeft(scrollContainerRef.current.scrollLeft);
  }

  // [수정] 이벤트 타입을 MouseEvent | TouchEvent로 확장
  function handleDragMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDragging || !scrollContainerRef?.current) return;
    const newDragX = getClientX(e); // [수정] 헬퍼 함수 사용
    const dragDistance = dragX.init - newDragX;
    scrollContainerRef.current.scrollLeft = initScrollLeft + dragDistance;
    setDragX((prevDragX) => ({
      ...prevDragX,
      min: Math.min(prevDragX.min, newDragX),
      max: Math.max(prevDragX.max, newDragX),
    }));
  }

  function handleDragEnd() {
    if (!scrollContainerRef?.current) return;
    setIsDragging(false);
  }

  function handleDragLeave() {
    handleDragEnd();
  }

  useEffect(() => {
    if (ref.current) {
      setScrollContainerRef(ref);
    }
  }, [ref]);

  useEffect(() => {
    setIsDragEvent(dragX.max - dragX.min >= 10);
  }, [dragX.max, dragX.min]);

  return {
    isDragEvent,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleDragLeave,
  };
}
