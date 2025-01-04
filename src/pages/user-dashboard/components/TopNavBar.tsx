import { useContext } from 'react';

import NavBar from '../../../components/NavBar';
import { MyScheduleContext } from '../../../contexts/MyScheduleContext';

export default function TopNavBar() {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  const navbarProps = {
    overlay: selectedTimeBlockId !== null,
  };

  return (
    <>
      <NavBar variant="default" className="hidden md:flex" {...navbarProps} />
      <NavBar variant="black" className="flex md:hidden" {...navbarProps} />
    </>
  );
}
