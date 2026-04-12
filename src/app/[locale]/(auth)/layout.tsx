import AuthLayout from '@/features/auth/layouts/AuthLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
