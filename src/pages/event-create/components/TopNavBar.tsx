import { useEffect, useState } from 'react';

import NavBar from '../../../components/NavBar';
import breakpoint from '../../../utils/breakpoint';

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
