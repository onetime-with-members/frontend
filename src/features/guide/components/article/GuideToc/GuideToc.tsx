'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import GuideTocLink from './GuideTocLink';
import { GuideTocItem } from '@/features/guide/types';

export default function GuideToc({ headings }: { headings: GuideTocItem[] }) {
  const t = useTranslations('guide.components.GuideToc');
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    const headingElements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -70% 0px' },
    );

    headingElements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden md:sticky md:top-20 md:block md:h-fit md:w-44 md:shrink-0 lg:w-48">
      <p className="mb-3 text-gray-40 text-sm-300">{t('title')}</p>
      <ul className="flex flex-col">
        {headings.map((heading) => (
          <GuideTocLink
            key={heading.id}
            heading={heading}
            isActive={heading.id === activeId}
          />
        ))}
      </ul>
    </aside>
  );
}
