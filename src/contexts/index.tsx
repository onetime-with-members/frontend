import BarBannerContextProvider from './bar-banner';
import CurrentUserContextProvider from './current-user';
import FooterContextProvider from './footer';
import MyScheduleContextProvider from './my-schedule';
import PageModeContextProvider from './page-mode';
import PolicyContextProvider from './policy';
import ScrollContextProvider from './scroll';
import SleepTimeContextProvider from './sleep-time';
import WeekdayLocaleContextProvider from './weekday-locale';
import { auth, currentUser } from '@/lib/auth';
import { fetchBarBanner, fetchMySchedule, fetchSleepTime } from '@/lib/data';
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';

export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  let user, sleepTime, mySchedule;
  if (await auth()) {
    user = await currentUser();
    sleepTime = await fetchSleepTime();
    mySchedule = await fetchMySchedule();
  }

  let barBanner = null;
  if (!(await cookies()).get('bar-banner')) {
    barBanner = await fetchBarBanner();
  }

  const locale = await getLocale();

  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>
          <PolicyContextProvider>
            <CurrentUserContextProvider defaultUser={user}>
              <SleepTimeContextProvider defaultSleepTime={sleepTime}>
                <MyScheduleContextProvider defaultMySchedule={mySchedule}>
                  <BarBannerContextProvider barBanner={barBanner}>
                    <WeekdayLocaleContextProvider initialLocale={locale}>
                      {children}
                    </WeekdayLocaleContextProvider>
                  </BarBannerContextProvider>
                </MyScheduleContextProvider>
              </SleepTimeContextProvider>
            </CurrentUserContextProvider>
          </PolicyContextProvider>
        </ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
