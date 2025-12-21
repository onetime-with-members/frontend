'use client';

import { useContext, useEffect, useRef } from 'react';

import LinkContent from './LinkContent';
import TopContent from './TopContent';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import LanguageDropdown from '@/features/user/components/shared/LanguageDropdown';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const { setFooterRef, footerVisible } = useContext(FooterContext);

  useEffect(() => {
    if (footerRef && footerRef.current) {
      setFooterRef(footerRef);
    }
  }, [footerRef, setFooterRef]);

  return (
    footerVisible && (
      <footer ref={footerRef} className="bg-gray-80 px-4 pb-20 pt-8">
        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-start gap-8">
          <div className="flex w-full flex-col gap-4">
            <TopContent />
            <LinkContent />
          </div>
          <LanguageDropdown variant="dark" menuPosition="top" />
        </div>
      </footer>
    )
  );
}
