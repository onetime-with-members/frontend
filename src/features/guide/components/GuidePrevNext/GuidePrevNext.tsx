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
    <nav className="mt-12 flex flex-col gap-3 border-t border-gray-10 pt-6 sm:flex-row sm:justify-between">
      {prev ? (
        <ProgressLink
          href={`/guide/${prev.slug}`}
          className="flex flex-1 flex-col gap-1 rounded-xl border border-gray-10 p-4 hover:bg-gray-05 sm:max-w-[48%]"
        >
          <span className="flex items-center gap-1 text-sm-100 text-gray-40">
            <IconChevronLeft size={14} />
            {prevLabel}
          </span>
          <span className="text-md-300 text-gray-90">{prev.title}</span>
          <span className="text-sm-100 text-gray-40">{prev.section}</span>
        </ProgressLink>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next ? (
        <ProgressLink
          href={`/guide/${next.slug}`}
          className="flex flex-1 flex-col gap-1 rounded-xl border border-gray-10 p-4 text-right hover:bg-gray-05 sm:max-w-[48%] sm:items-end"
        >
          <span className="flex items-center gap-1 text-sm-100 text-gray-40">
            {nextLabel}
            <IconChevronRight size={14} />
          </span>
          <span className="text-md-300 text-gray-90">{next.title}</span>
          <span className="text-sm-100 text-gray-40">{next.section}</span>
        </ProgressLink>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
    </nav>
  );
}
