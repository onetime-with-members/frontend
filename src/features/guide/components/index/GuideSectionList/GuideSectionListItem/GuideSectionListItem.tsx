import { ProgressLink } from '@/navigation';

export default function GuideSectionListItem({
  article,
}: {
  article: {
    slug: string;
    title: string;
    description: string;
  };
}) {
  return (
    <li>
      <ProgressLink
        href={`/guide/${article.slug}`}
        className="flex flex-col gap-1 rounded-xl border border-gray-10 p-4 hover:bg-gray-05"
      >
        <span className="text-md-300 text-gray-90">{article.title}</span>
        <span className="text-sm-100 text-gray-50">{article.description}</span>
      </ProgressLink>
    </li>
  );
}
