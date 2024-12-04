import { createContext, useContext, useEffect, useState } from 'react';

interface FooterContextType {
  isFooterVisible: boolean;
  setIsFooterVisible: React.Dispatch<React.SetStateAction<boolean>>;
  footerRef: React.RefObject<HTMLDivElement> | undefined;
  setFooterRef: React.Dispatch<
    React.SetStateAction<React.RefObject<HTMLDivElement> | undefined>
  >;
  isFooterShown: boolean;
}

interface FooterContextProps {
  children: React.ReactNode;
}

export const FooterContext = createContext<FooterContextType>({
  isFooterVisible: true,
  setIsFooterVisible: () => {},
  footerRef: undefined,
  setFooterRef: () => {},
  isFooterShown: false,
});

export function FooterContextProvider({ children }: FooterContextProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [isFooterShown, setIsFooterShown] = useState(false);
  const [footerRef, setFooterRef] = useState<React.RefObject<HTMLDivElement>>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterShown(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (footerRef && footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef && footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [footerRef]);

  return (
    <FooterContext.Provider
      value={{
        isFooterVisible,
        setIsFooterVisible,
        footerRef,
        setFooterRef,
        isFooterShown,
      }}
    >
      {children}
    </FooterContext.Provider>
  );
}
