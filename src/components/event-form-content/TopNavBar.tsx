import NavBar from '../NavBar';

export default function TopNavBar() {
  return (
    <>
      <NavBar variant="default" className="hidden md:flex" />
      <NavBar variant="black" className="flex md:hidden" />
    </>
  );
}
