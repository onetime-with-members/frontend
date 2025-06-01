'use client';

import { createContext, useRef } from 'react';

interface ScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement | null> | null;
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollContainerRef: null,
});

export default function ScrollContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
