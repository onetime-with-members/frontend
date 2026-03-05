import MyPageLayout from '@/features/user/layouts/MyPageLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MyPageLayout>{children}</MyPageLayout>;
}
