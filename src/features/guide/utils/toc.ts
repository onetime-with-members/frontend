import { GuideTocItem } from '../types';

type MarkdownNode = {
  type?: string;
  value?: string;
  children?: MarkdownNode[];
};

export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

export function getNodeText(node: unknown): string {
  const n = node as MarkdownNode | undefined;
  if (!n) return '';
  if (n.type === 'text') return n.value ?? '';
  return (n.children ?? []).map(getNodeText).join('');
}

export function extractHeadings(markdown: string): GuideTocItem[] {
  const items: GuideTocItem[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const text = match[1]
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*?([^*]+)\*\*?/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .trim();

    items.push({ id: slugifyHeading(text), text });
  }

  return items;
}
