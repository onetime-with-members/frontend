'use client';

import { useTranslations } from 'next-intl';
import { useContext, useEffect, useRef } from 'react';

import LanguageDropdown from '@/components/dropdown/language-dropdown';
import SpeakerPhoneIcon from '@/components/icon/SpeakerPhoneIcon';
import { FooterContext } from '@/contexts/footer';
import { ProgressLink } from '@/navigation';
import { IconBrandInstagram } from '@tabler/icons-react';
import Image from 'next/image';

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
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    src="/images/logo-white.svg"
                    alt="OneTime"
                    width={148}
                    height={32}
                  />
                </div>
                <a
                  href="https://www.instagram.com/one.time.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-70 p-2 duration-150 hover:bg-[#3f4352] active:bg-[#3f4352]"
                >
                  <IconBrandInstagram size={20} className="text-gray-40" />
                </a>
              </div>
              <p className="text-gray-20 text-sm-100">
                ©OneTime. ALL RIGHTS RESERVED
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfDuttkDxmZDZbHhawL5GSJOgOOelOTFFgoomRVWYHWlEP9Qg/viewform?usp=dialog"
                className="flex items-center gap-1 text-gray-00"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-base">
                  <SpeakerPhoneIcon />
                </span>
                <span className="text-sm-300">{t('feedbackIssue')}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-40">
                <ProgressLink href="/policy/privacy">
                  {t('privacyPolicy')}
                </ProgressLink>
                <span>|</span>
                <ProgressLink href="/policy/service">
                  {t('termsOfService')}
                </ProgressLink>
              </div>
            </div>
          </div>
          <LanguageDropdown variant="dark" menuPosition="top" />
        </div>
      </footer>
    )
  );
}
