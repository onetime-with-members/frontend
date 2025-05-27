import NavBar from '@/components/nav-bar';

export default function TopNavBarForDesktop() {
  return (
    <div className="hidden md:block">
      <NavBar isAuthHidden={true} />
    </div>
  );
}
