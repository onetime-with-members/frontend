import CurrentUserContextProvider from './current-user';
import FooterContextProvider from './footer';
import MyScheduleContextProvider from './my-schedule';
import PageModeContextProvider from './page-mode';
import PolicyContextProvider from './policy';
import ScrollContextProvider from './scroll';
import SleepTimeContextProvider from './sleep-time';
import { auth, currentUser } from '@/lib/auth';
import { fetchMySchedule, fetchSleepTime } from '@/lib/data';

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

  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>
          <PolicyContextProvider>
            <CurrentUserContextProvider defaultUser={user}>
              <SleepTimeContextProvider defaultSleepTime={sleepTime}>
                <MyScheduleContextProvider defaultMySchedule={mySchedule}>
                  {children}
                </MyScheduleContextProvider>
              </SleepTimeContextProvider>
            </CurrentUserContextProvider>
          </PolicyContextProvider>
        </ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
