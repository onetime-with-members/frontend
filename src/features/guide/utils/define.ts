import { GuideArticle, GuideSectionId } from '../types';

export function parseMarkdown(raw: string): {
  title: string;
  description: string;
  body: string;
} {
  const normalized = raw.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalized);

  if (!match) {
    return { title: '', description: '', body: normalized.trim() };
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':');
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return {
    title: data.title ?? '',
    description: data.description ?? '',
    body: normalized.slice(match[0].length).trim(),
  };
}

export default function buildArticle(src: {
  slug: string;
  section: GuideSectionId;
  order: number;
  ko: string;
  en: string;
}): GuideArticle {
  const ko = parseMarkdown(src.ko);
  const en = parseMarkdown(src.en);

  return {
    slug: src.slug,
    section: src.section,
    order: src.order,
    title: { ko: ko.title, en: en.title },
    description: { ko: ko.description, en: en.description },
    body: { ko: ko.body, en: en.body },
  };
}
