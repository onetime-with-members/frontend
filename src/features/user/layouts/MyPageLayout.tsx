import DesktopLayout from '../components/my-page-layout/DesktopLayout';
import MobileLayout from '../components/my-page-layout/MobileLayout';
import MyPageTabContextProvider from '../contexts/MyPageTabContext';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyPageTabContextProvider>
      <MobileLayout>{children}</MobileLayout>
      <DesktopLayout>{children}</DesktopLayout>
    </MyPageTabContextProvider>
  );
}
