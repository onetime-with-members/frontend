import MobileAppBar from './MobileAppBar';

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="block md:hidden" data-testid="mobile-tab-layout">
      <MobileAppBar />
      <main className="pb-20">{children}</main>
    </div>
  );
}
