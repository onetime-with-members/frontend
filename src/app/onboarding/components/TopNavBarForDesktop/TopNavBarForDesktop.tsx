import NavBar from '@/components/NavBar/NavBar';

export default function TopNavBarForDesktop() {
  return (
    <div className="hidden md:block">
      <NavBar isAuthHidden={true} />
    </div>
  );
}
