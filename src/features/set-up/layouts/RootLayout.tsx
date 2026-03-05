import { Locale } from 'next-intl';

import Scripts from '../components/Scripts';
import CookieModal from '../components/root-layout/CookieModal';
import Favicon from '../components/root-layout/Favicon';
import Footer from '../components/root-layout/Footer';
import NetworkErrorScreen from '../components/root-layout/NetworkErrorScreen';
import NoScripts from '../components/root-layout/NoScripts';
import PreloadImages from '../components/root-layout/PreloadImages';
import ProgressBar from '../components/root-layout/ProgressBar';
import Providers from '../components/root-layout/Providers';
import Toast from '@/components/Toast';
import Head from 'next/head';

export default function RootLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale}>
      <Head>
        <Favicon />
      </Head>
      <body cz-shortcut-listen="true" className="font-pretendard">
        <Providers>
          <ProgressBar />
          <div className="flex min-h-[110vh] flex-col">{children}</div>
          <Footer />
          {/* <LandingPopUp initialIsShown={initialIsLandingPopUpShown} /> */}
          <CookieModal />
          <div id="pop-up" />
          <div id="alert" />
          <Toast />
          <NetworkErrorScreen />
        </Providers>
        <PreloadImages />
        <NoScripts />
      </body>
      <Scripts />
    </html>
  );
}
