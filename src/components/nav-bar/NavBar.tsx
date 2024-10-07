import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../../assets/logo-white.svg';
import logoBlack from '../../assets/logo.svg';

export default function NavBar() {
  const [isNavBackground, setIsNavBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavBackground(true);
      } else {
        setIsNavBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavBackground]);

  return (
    <nav className="flex h-[4rem] w-full">
      <div
        className={clsx(
          'fixed left-0 top-0 z-40 flex h-[4rem] w-full items-center justify-center shadow transition-colors duration-200',
          {
            'bg-gray-00 shadow-lg': isNavBackground,
            'bg-transparent shadow-none': !isNavBackground,
          },
        )}
      >
        <Link to="/">
          <img
            src={isNavBackground ? logoBlack : logoWhite}
            alt="OneTime 로고"
          />
        </Link>
      </div>
    </nav>
  );
}
