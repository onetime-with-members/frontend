import BarBannerContextProvider from '../features/banner/contexts/BarBannerContext';
import PageModeContextProvider from '../features/event/contexts/PageModeContext';
import EverytimeScheduleContextProvider from '../features/my-schedule/contexts/EverytimeScheduleContext';
import MyScheduleContextProvider from '../features/my-schedule/contexts/MyScheduleContext';
import SleepTimeContextProvider from '../features/my-schedule/contexts/SleepTimeContext';
import FooterContextProvider from '../features/set-up/contexts/FooterContext';
import PolicyContextProvider from '../features/user/contexts/PolicyContext';
import ToastContextProvider from './ToastContext';
import WeekdayLocaleContextProvider from './WeekdayLocaleContext';
import { fetchBarBanner } from '@/features/banner/api/banner.api';
import SessionContextProvider from '@/features/user/contexts/SessionContext';
import { auth } from '@/lib/auth';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const { session, isLoggedIn } = await auth();

  let barBanner = null;
  if (!cookieStore.get('bar-banner')) {
    barBanner = await fetchBarBanner();
  }

  const locale = await getLocale();

  return (
    <SessionContextProvider
      initialSession={session}
      initialIsLoggedIn={isLoggedIn}
    >
      <PageModeContextProvider>
        <FooterContextProvider>
          <PolicyContextProvider>
            <SleepTimeContextProvider>
              <MyScheduleContextProvider>
                <BarBannerContextProvider barBanner={barBanner}>
                  <WeekdayLocaleContextProvider initialLocale={locale}>
                    <ToastContextProvider>
                      <EverytimeScheduleContextProvider>
                        {children}
                      </EverytimeScheduleContextProvider>
                    </ToastContextProvider>
                  </WeekdayLocaleContextProvider>
                </BarBannerContextProvider>
              </MyScheduleContextProvider>
            </SleepTimeContextProvider>
          </PolicyContextProvider>
        </FooterContextProvider>
      </PageModeContextProvider>
    </SessionContextProvider>
  );
}
