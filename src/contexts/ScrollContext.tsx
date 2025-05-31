'use client';

import { createContext, useRef } from 'react';

export const ScrollContext = createContext<{
  scrollContainerRef: React.RefObject<HTMLDivElement | null> | null;
}>({
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
