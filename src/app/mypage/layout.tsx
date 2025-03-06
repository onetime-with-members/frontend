import MyPageLayout from './components/MyPageLayout';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <MyPageLayout>{children}</MyPageLayout>;
}
