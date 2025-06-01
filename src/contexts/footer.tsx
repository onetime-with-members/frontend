'use client';

import { createContext, useEffect, useState } from 'react';

interface FooterContextType {
  footerVisible: boolean;
  setFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  footerRef: React.RefObject<HTMLDivElement | null> | undefined;
  setFooterRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement | null> | undefined>
  >;
  isFooterShown: boolean;
}

export const FooterContext = createContext<FooterContextType>({
  footerVisible: true,
  setFooterVisible: () => {},
  footerRef: undefined,
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
  const [footerRef, setFooterRef] =
    useState<React.RefObject<HTMLDivElement | null>>();

  useEffect(() => {
    const footer = footerRef?.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterShown(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (footerRef?.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
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
