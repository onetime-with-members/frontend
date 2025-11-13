import NavBar from '@/components/NavBar';

export default function TopNavBar() {
  return (
    <>
      <NavBar variant="gray" className="hidden md:flex" shadow={false} />
      <NavBar variant="black" className="flex md:hidden" shadow={false} />
    </>
  );
}
