import CurrentUserContextProvider from './CurrentUserContext';
import FooterContextProvider from './FooterContext';
import PageModeContextProvider from './PageModeContext';
import PolicyContextProvider from './PolicyContext';
import ScrollContextProvider from './ScrollContext';
import { auth, currentUser } from '@/lib/auth';

export default async function ContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await auth()) ? await currentUser() : null;

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
