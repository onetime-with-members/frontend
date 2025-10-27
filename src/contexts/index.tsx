import BarBannerContextProvider from './bar-banner';
import EverytimeScheduleContextProvider from './everytime-schedule';
import FooterContextProvider from './footer';
import MyScheduleContextProvider from './my-schedule';
import PageModeContextProvider from './page-mode';
import PolicyContextProvider from './policy';
import ScrollContextProvider from './scroll';
import SleepTimeContextProvider from './sleep-time';
import ToastContextProvider from './toast';
import WeekdayLocaleContextProvider from './weekday-locale';
import { fetchBarBanner } from '@/features/banner/api/banner.api';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  let barBanner = null;
  if (!cookieStore.get('bar-banner')) {
    barBanner = await fetchBarBanner();
  }

  const locale = await getLocale();

  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>
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
        </ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
