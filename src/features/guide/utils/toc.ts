import { GuideTocItem } from '../types';

type MarkdownNode = {
  type?: string;
  value?: string;
  children?: MarkdownNode[];
};

/**
 * 헤딩 텍스트를 앵커 id로 변환합니다. 본문 H2의 `id`(MarkdownHeading)와
 * 목차 링크(GuideToc)가 같은 값을 만들도록 양쪽에서 이 함수를 공유합니다.
 */
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

/** react-markdown이 넘겨주는 hast 노드에서 보이는 텍스트만 추출합니다. */
export function getNodeText(node: unknown): string {
  const n = node as MarkdownNode | undefined;
  if (!n) return '';
  if (n.type === 'text') return n.value ?? '';
  return (n.children ?? []).map(getNodeText).join('');
}

/** 마크다운 본문에서 H2 헤딩만 뽑아 목차 항목으로 만듭니다(코드펜스 내부는 제외). */
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
