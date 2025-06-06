import CurrentUserContextProvider from './current-user';
import FooterContextProvider from './footer';
import PageModeContextProvider from './page-mode';
import PolicyContextProvider from './policy';
import ScrollContextProvider from './scroll';
import SleepTimeContextProvider from './sleep-time';
import { auth, currentUser } from '@/lib/auth';
import { fetchSleepTime } from '@/lib/data';

export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  let sleepTime;
  if (await auth()) {
    user = await currentUser();
    sleepTime = await fetchSleepTime();
  } else {
    user = null;
    sleepTime = null;
  }

  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>
          <PolicyContextProvider>
            <CurrentUserContextProvider defaultUser={user}>
              <SleepTimeContextProvider defaultSleepTime={sleepTime}>
                {children}
              </SleepTimeContextProvider>
            </CurrentUserContextProvider>
          </PolicyContextProvider>
        </ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
