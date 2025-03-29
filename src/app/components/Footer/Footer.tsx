'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useRef } from 'react';

import LogoContent from './LogoContent/LogoContent';
import LanguageDropdown from '@/components/dropdown/LanguageDropdown/LanguageDropdown';
import SpeakerPhoneIcon from '@/components/icon/SpeakerPhoneIcon';
import { FooterContext } from '@/contexts/FooterContext';
import { Link } from '@/navigation';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const { setFooterRef, footerVisible } = useContext(FooterContext);

  const t = useTranslations('footer');

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
            <div className="flex flex-col gap-2">
              <LogoContent />
              <p className="text-gray-20 text-sm-100">
                ©OneTime. ALL RIGHTS RESERVED
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfDuttkDxmZDZbHhawL5GSJOgOOelOTFFgoomRVWYHWlEP9Qg/viewform?usp=dialog"
                className="flex items-center gap-1 text-gray-00 text-sm-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <SpeakerPhoneIcon />
                </span>
                <span>{t('feedbackIssue')}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-40">
                <Link href="/policy/privacy">{t('privacyPolicy')}</Link>
                <span>|</span>
                <Link href="/policy/service">{t('termsOfService')}</Link>
              </div>
            </div>
          </div>
          <LanguageDropdown variant="dark" menuPosition="top" />
        </div>
      </footer>
    )
  );
}
