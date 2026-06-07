import { GuideTocItem } from '@/features/guide/types';
import cn from '@/lib/cn';

export default function GuideTocLink({
  item,
  isActive,
}: {
  item: GuideTocItem;
  isActive: boolean;
}) {
  return (
    <li>
      <a
        href={`#${item.id}`}
        className={cn(
          'block border-l-2 border-gray-10 py-1.5 pl-3 text-gray-50 text-sm-100 hover:border-gray-30 hover:text-gray-90',
          {
            'border-primary-50 text-primary-60 text-sm-300': isActive,
          },
        )}
      >
        {item.text}
      </a>
    </li>
  );
}
