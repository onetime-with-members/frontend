import MobileAppBar from './MobileAppBar';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block md:hidden">
      <MobileAppBar />
      <main className="pb-20">{children}</main>
    </div>
  );
}
