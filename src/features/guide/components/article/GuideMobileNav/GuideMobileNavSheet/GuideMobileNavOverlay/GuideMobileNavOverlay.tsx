import cn from '@/lib/cn';

export default function GuideMobileNavOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      aria-hidden
      className={cn(
        'fixed inset-0 z-50 bg-gray-90/40 transition-opacity duration-200 md:hidden',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    />
  );
}
