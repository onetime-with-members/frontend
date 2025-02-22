import { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import LanguageDropdown from '../../../components/dropdown/LanguageDropdown/LanguageDropdown';
import LogoContent from './LogoContent/LogoContent';
import { FooterContext } from '@/contexts/FooterContext';

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  const { setFooterRef } = useContext(FooterContext);

  const { t } = useTranslation();

  useEffect(() => {
    if (footerRef && footerRef.current) {
      setFooterRef(footerRef);
    }
  }, [footerRef]);

  return (
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
            <Link to="/policy/privacy">{t('footer.privacyPolicy')}</Link>
            <span>|</span>
            <Link to="/policy/service">{t('footer.termsOfService')}</Link>
          </div>
        </div>
        <LanguageDropdown />
      </div>
    </footer>
  );
}
