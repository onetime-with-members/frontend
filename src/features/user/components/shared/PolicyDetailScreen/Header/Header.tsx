import { useContext } from 'react';

import { PolicyDetailContext } from '@/features/user/contexts/PolicyDetailContext';
import { IconChevronLeft } from '@tabler/icons-react';

export default function Header() {
  const { pageTitle, handleClose } = useContext(PolicyDetailContext);

  return (
    <div className="hidden items-center py-6 md:flex">
      <button onClick={handleClose}>
        <IconChevronLeft size={32} />
      </button>
      <h1 className="text-gray-90 title-lg-300">{pageTitle}</h1>
    </div>
  );
}
