import { createContext, useRef } from 'react';

interface ScrollContextType {
  scrollContainerRef: React.RefObject<HTMLDivElement> | null;
}

interface ScrollContextProviderProps {
  children: React.ReactNode;
}

export const ScrollContext = createContext<ScrollContextType>({
  scrollContainerRef: null,
});

export function ScrollContextProvider({
  children,
}: ScrollContextProviderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={{ scrollContainerRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
