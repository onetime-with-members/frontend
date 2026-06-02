import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { getNodeText } from '../../../utils/toc';
import { IconBulb, IconAlertTriangle } from '@tabler/icons-react';

type CalloutKind = 'tip' | 'caution';

// `> 팁: ...`(ko) / `> Tip: ...`(en) → 팁(primary) 박스,
// `> 주의: ...` / `> Caution:` / `> Note:` → 주의(warning) 박스로 렌더링합니다.
// 그 외 인용구는 기본 blockquote 스타일을 유지합니다.
// 박스 스타일은 styles/guide-article.css의 `.guide-callout`에서 처리합니다.
const CALLOUT_PATTERN = /^\s*(팁|Tip|주의|Caution|Note)\s*[:：]/i;

const ICON: Record<CalloutKind, typeof IconBulb> = {
  tip: IconBulb,
  caution: IconAlertTriangle,
};

function detectKind(text: string): CalloutKind | null {
  const match = CALLOUT_PATTERN.exec(text);
  if (!match) return null;
  const keyword = match[1].toLowerCase();
  return keyword === '팁' || keyword === 'tip' ? 'tip' : 'caution';
}

export default function MarkdownBlockquote({
  node,
  children,
}: ComponentPropsWithoutRef<'blockquote'> & ExtraProps) {
  const kind = detectKind(getNodeText(node));

  if (!kind) {
    return <blockquote>{children}</blockquote>;
  }

  const Icon = ICON[kind];

  return (
    <blockquote className={`guide-callout guide-callout--${kind}`}>
      <Icon size={20} className="guide-callout__icon" />
      <div className="guide-callout__body">{children}</div>
    </blockquote>
  );
}
