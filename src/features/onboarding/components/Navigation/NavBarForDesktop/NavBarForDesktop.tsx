import NavBar from '@/components/NavBar';

export default function NavBarForDesktop() {
  return (
    <div className="hidden md:block">
      <NavBar isAuthHidden={true} />
    </div>
  );
}
