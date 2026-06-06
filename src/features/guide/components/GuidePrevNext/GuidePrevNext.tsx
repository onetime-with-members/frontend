import { ProgressLink } from '@/navigation';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface NavItem {
  slug: string;
  title: string;
  section: string;
}

export default function GuidePrevNext({
  prev,
  next,
  prevLabel,
  nextLabel,
}: {
  prev: NavItem | null;
  next: NavItem | null;
  prevLabel: string;
  nextLabel: string;
}) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 flex justify-between gap-3">
      {prev ? (
        <ProgressLink
          href={`/guide/${prev.slug}`}
          className="flex max-w-[48%] flex-1 flex-col gap-1 rounded-xl border border-gray-10 p-4 hover:bg-gray-05"
        >
          <span className="flex items-center gap-1 text-sm-100 text-gray-40">
            <IconChevronLeft size={14} />
            {prevLabel}
          </span>
          <span className="text-md-300 text-gray-90">{prev.title}</span>
          <span className="text-sm-100 text-gray-40">{prev.section}</span>
        </ProgressLink>
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <ProgressLink
          href={`/guide/${next.slug}`}
          className="flex max-w-[48%] flex-1 flex-col items-end gap-1 rounded-xl border border-gray-10 p-4 text-right hover:bg-gray-05"
        >
          <span className="flex items-center gap-1 text-sm-100 text-gray-40">
            {nextLabel}
            <IconChevronRight size={14} />
          </span>
          <span className="text-md-300 text-gray-90">{next.title}</span>
          <span className="text-sm-100 text-gray-40">{next.section}</span>
        </ProgressLink>
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
