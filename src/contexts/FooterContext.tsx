import { createContext, useEffect, useState } from 'react';

interface FooterContextType {
  hasFooter: boolean;
  setHasFooter: React.Dispatch<React.SetStateAction<boolean>>;
  footerRef: React.RefObject<HTMLDivElement | null> | undefined;
  setFooterRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement | null> | undefined>
  >;
  isFooterShown: boolean;
}

interface FooterContextProps {
  children: React.ReactNode;
}

export const FooterContext = createContext<FooterContextType>({
  hasFooter: true,
  setHasFooter: () => {},
  footerRef: undefined,
  setFooterRef: () => {},
  isFooterShown: false,
});

export function FooterContextProvider({ children }: FooterContextProps) {
  const [hasFooter, setHasFooter] = useState(true);
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
        hasFooter,
        setHasFooter,
        footerRef,
        setFooterRef,
        isFooterShown,
      }}
    >
      {children}
    </FooterContext.Provider>
  );
}
