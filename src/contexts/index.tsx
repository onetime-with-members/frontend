import CurrentUserContextProvider from './current-user';
import FooterContextProvider from './footer';
import PageModeContextProvider from './page-mode';
import PolicyContextProvider from './policy';
import ScrollContextProvider from './scroll';
import { auth, currentUser } from '@/lib/auth';

export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;
  if (await auth()) {
    user = await currentUser();
  } else {
    user = null;
  }

  return (
    <PageModeContextProvider>
      <FooterContextProvider>
        <ScrollContextProvider>
          <PolicyContextProvider>
            <CurrentUserContextProvider defaultUser={user}>
              {children}
            </CurrentUserContextProvider>
          </PolicyContextProvider>
        </ScrollContextProvider>
      </FooterContextProvider>
    </PageModeContextProvider>
  );
}
