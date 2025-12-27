'use client';

import { useContext } from 'react';

import LinkContent from './LinkContent';
import TopContent from './TopContent';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import LanguageDropdown from '@/features/user/components/shared/LanguageDropdown';

export default function Footer() {
  const { setFooterRef, footerVisible } = useContext(FooterContext);

  return (
    footerVisible && (
      <footer ref={setFooterRef} className="bg-gray-80 px-4 pb-20 pt-8">
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
