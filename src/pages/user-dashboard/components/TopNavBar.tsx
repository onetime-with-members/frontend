import { useContext } from 'react';

import NavBar from '../../../components/NavBar';
import { MyScheduleContext } from '../../../contexts/MyScheduleContext';

export default function TopNavBar() {
  const { selectedTimeBlockId } = useContext(MyScheduleContext);

  return <NavBar overlay={selectedTimeBlockId !== null} />;
}
