import { useContext } from 'react';

import TopAppBarForMobile from './TopAppBarForMobile';
import TopNavBarForDesktop from './TopNavBarForDesktop';
import { PolicyDetailContext } from '@/features/user/contexts/PolicyDetailContext';

export default function TopNavigation() {
  const { pageTitle, handleClose } = useContext(PolicyDetailContext);

  return (
    <>
      <TopAppBarForMobile pageTitle={pageTitle} onClose={handleClose} />
      <TopNavBarForDesktop />
    </>
  );
}
