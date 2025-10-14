import NavBar from '@/components/nav-bar';

export default function DashboardNavBar() {
  return (
    <>
      <NavBar variant="default" className="hidden md:flex" shadow={false} />
      <NavBar variant="black" className="flex md:hidden" shadow={false} />
    </>
  );
}
