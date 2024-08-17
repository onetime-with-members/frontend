import logo from '../../../assets/logo.svg';

export default function NavBar() {
  return (
    <header className="flex h-[4rem] w-full">
      <nav className="fixed left-0 top-0 z-40 flex h-[4rem] w-full items-center justify-center bg-gray-00">
        <img src={logo} alt="OneTime 로고" />
      </nav>
    </header>
  );
}
