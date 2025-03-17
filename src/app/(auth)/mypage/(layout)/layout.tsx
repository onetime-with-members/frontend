import MyPageLayout from './components/MyPageLayout';
import { headers } from 'next/headers';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const pathname = (await headers()).get('x-pathname') || '';

  return <MyPageLayout pathname={pathname}>{children}</MyPageLayout>;
}
