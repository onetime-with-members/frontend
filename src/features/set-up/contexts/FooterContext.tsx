'use client';

import { createContext, useEffect, useState } from 'react';

export const FooterContext = createContext<{
  footerVisible: boolean;
  setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  footerRef: HTMLElement | null;
  setFooterRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  isFooterShown: boolean;
}>({
  footerVisible: true,
  setFooterVisible: () => {},
  footerRef: null,
  setFooterRef: () => {},
  isFooterShown: false,
});

export default function FooterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [footerVisible, setFooterVisible] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(false);
  const [footerRef, setFooterRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!footerRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterShown(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(footerRef);

    return () => {
      observer.unobserve(footerRef);
    };
  }, [footerRef]);

  return (
    <FooterContext.Provider
      value={{
        footerVisible,
        setFooterVisible,
        footerRef,
        setFooterRef,
        isFooterShown,
      }}
    >
      {children}
    </FooterContext.Provider>
  );
}
