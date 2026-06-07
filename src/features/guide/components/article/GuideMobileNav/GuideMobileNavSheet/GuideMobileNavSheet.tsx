import { ReactNode } from 'react';

import GuideMobileNavOverlay from './GuideMobileNavOverlay';
import GuideMobileNavPanel from './GuideMobileNavPanel';

export default function GuideMobileNavSheet({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <GuideMobileNavOverlay isOpen={isOpen} onClose={onClose} />
      <GuideMobileNavPanel isOpen={isOpen} onClose={onClose}>
        {children}
      </GuideMobileNavPanel>
    </>
  );
}
