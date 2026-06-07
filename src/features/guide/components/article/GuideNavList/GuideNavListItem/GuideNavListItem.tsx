import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';

export default function GuideNavListItem({
  item,
  isActive,
}: {
  item: { slug: string; title: string };
  isActive: boolean;
}) {
  return (
    <li>
      <ProgressLink
        href={`/guide/${item.slug}`}
        className={cn(
          'block rounded-md px-2 py-1.5 text-gray-60 text-sm-100 hover:bg-gray-05 hover:text-gray-90',
          {
            'bg-primary-00 text-primary-60': isActive,
          },
        )}
      >
        {item.title}
      </ProgressLink>
    </li>
  );
}
