import GuideNavLink from './GuideNavLink';
import { getAdjacentArticles } from '@/features/guide/utils/articles';

export default function GuidePrevNext({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentArticles(slug);
  if (!prev && !next) return null;

  return (
    <nav className="mt-12 flex justify-between gap-3">
      {prev ? (
        <GuideNavLink article={prev} direction="prev" />
      ) : (
        <span className="flex-1" />
      )}
      {next ? (
        <GuideNavLink article={next} direction="next" />
      ) : (
        <span className="flex-1" />
      )}
    </nav>
  );
}
