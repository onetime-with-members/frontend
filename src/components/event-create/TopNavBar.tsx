import { useEffect, useState } from 'react';

import breakpoint from '../../utils/breakpoint';
import NavBar from '../NavBar';

export default function TopNavBar() {
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  useEffect(() => {
    function updateClientWidth() {
      setClientWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateClientWidth);

    return () => {
      document.body.style.backgroundColor = '';
      window.removeEventListener('resize', updateClientWidth);
    };
  }, []);

  return (
    <>
      {clientWidth >= breakpoint.md && <NavBar variant="default" />}
      {clientWidth < breakpoint.md && <NavBar variant="black" />}
    </>
  );
}
