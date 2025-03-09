'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useRef } from 'react';

import LogoContent from './LogoContent/LogoContent';
import LanguageDropdown from '@/components/dropdown/LanguageDropdown/LanguageDropdown';
import { FooterContext } from '@/contexts/FooterContext';
import Link from 'next/link';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const { setFooterRef, hasFooter } = useContext(FooterContext);

  const t = useTranslations();

  useEffect(() => {
    if (footerRef && footerRef.current) {
      setFooterRef(footerRef);
    }
  }, [footerRef, setFooterRef]);

  return (
    hasFooter && (
      <footer ref={footerRef} className="bg-gray-80 px-4 pb-20 pt-8">
        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-start gap-8">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <LogoContent />
              <p className="text-gray-20 text-sm-100">
                ©OneTime. ALL RIGHTS RESERVED
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-40">
              <Link href="/policy/privacy">{t('footer.privacyPolicy')}</Link>
              <span>|</span>
              <Link href="/policy/service">{t('footer.termsOfService')}</Link>
            </div>
          </div>
          <LanguageDropdown variant="dark" menuPosition="top" />
        </div>
      </footer>
    )
  );
}
