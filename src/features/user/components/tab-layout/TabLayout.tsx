import MyPageTabContextProvider from '../../contexts/MyPageTabContext';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <MyPageTabContextProvider>
      <MobileLayout>{children}</MobileLayout>
      <DesktopLayout>{children}</DesktopLayout>
    </MyPageTabContextProvider>
  );
}
