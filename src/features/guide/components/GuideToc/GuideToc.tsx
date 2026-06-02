'use client';

import { useEffect, useState } from 'react';

import cn from '@/lib/cn';
import { GuideTocItem } from '../../types';

export default function GuideToc({
  items,
  title,
}: {
  items: GuideTocItem[];
  title: string;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px' },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden md:sticky md:top-20 md:block md:h-fit md:w-44 md:shrink-0 lg:w-48">
      <p className="text-sm-300 mb-3 text-gray-40">{title}</p>
      <ul className="flex flex-col">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  'block border-l-2 border-gray-10 py-1.5 pl-3 text-sm-100 text-gray-50 hover:border-gray-30 hover:text-gray-90',
                  {
                    'text-sm-300 border-primary-50 text-primary-60': isActive,
                  },
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
