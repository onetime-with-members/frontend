import { ReactNode } from 'react';

export default function GuideSidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="hidden md:sticky md:top-20 md:block md:h-fit md:w-56 md:shrink-0">
      <nav className="flex flex-col gap-6">{children}</nav>
    </aside>
  );
}
