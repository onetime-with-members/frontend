import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export default function WhiteNavBar() {
  return (
    <header className="flex h-[4rem] w-full">
      <nav className="fixed left-0 top-0 z-40 flex h-[4rem] w-full items-center justify-center bg-gray-00">
        <div>
          <img src={logo} alt="OneTime 로고" />
        </div>
        <Link to="/">로그인</Link>
      </nav>
    </header>
  );
}
