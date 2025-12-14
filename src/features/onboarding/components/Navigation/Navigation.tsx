import AppBarForMobile from './AppBarForMobile';
import NavBarForDesktop from './NavBarForDesktop';

export default function Navigation({
  pageIndex,
  setPageIndex,
}: {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <AppBarForMobile pageIndex={pageIndex} setPageIndex={setPageIndex} />
      <NavBarForDesktop />
    </>
  );
}
