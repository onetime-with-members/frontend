import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { type ExtraProps } from 'react-markdown';

import { getNodeText } from '../../../utils/toc';
import { IconBulb, IconAlertTriangle } from '@tabler/icons-react';

type CalloutKind = 'tip' | 'caution';

// `> 팁: ...`(ko) / `> Tip: ...`(en) → 팁(primary) 박스,
// `> 주의: ...` / `> Caution:` / `> Note:` → 주의(warning) 박스로 렌더링합니다.
// 그 외 인용구는 기본 blockquote 스타일을 유지합니다.
// 박스 스타일은 styles/guide-article.css의 `.guide-callout`에서 처리합니다.
const CALLOUT_PATTERN = /^\s*(팁|Tip|주의|Caution|Note)\s*[:：]\s*/i;

const ICON: Record<CalloutKind, typeof IconBulb> = {
  tip: IconBulb,
  caution: IconAlertTriangle,
};

function detectCallout(
  text: string,
): { kind: CalloutKind; label: string } | null {
  const match = CALLOUT_PATTERN.exec(text);
  if (!match) return null;
  const label = match[1];
  const lower = label.toLowerCase();
  const kind: CalloutKind = lower === '팁' || lower === 'tip' ? 'tip' : 'caution';
  return { kind, label };
}

// 본문 첫 텍스트에서 "팁:"/"Tip:" 등 접두 라벨을 제거합니다(라벨은 헤더로 분리).
// react-markdown이 <p> 앞뒤에 공백 텍스트 노드를 끼우므로, 첫 "요소" 자식을 찾습니다.
function stripLeadingLabel(children: ReactNode): ReactNode {
  const nodes = Children.toArray(children);
  const index = nodes.findIndex((child) => isValidElement(child));
  if (index === -1) return children;

  const target = nodes[index];
  if (!isValidElement<{ children?: ReactNode }>(target)) return children;

  const inner = Children.toArray(target.props.children);
  if (typeof inner[0] === 'string') {
    inner[0] = inner[0].replace(CALLOUT_PATTERN, '');
  }

  return nodes.map((child, i) =>
    i === index ? cloneElement(target, undefined, inner) : child,
  );
}

export default function MarkdownBlockquote({
  node,
  children,
}: ComponentPropsWithoutRef<'blockquote'> & ExtraProps) {
  const callout = detectCallout(getNodeText(node));

  if (!callout) {
    return <blockquote>{children}</blockquote>;
  }

  const { kind, label } = callout;
  const Icon = ICON[kind];

  return (
    <blockquote className={`guide-callout guide-callout--${kind}`}>
      <div className="guide-callout__head">
        <Icon size={18} className="guide-callout__icon" />
        <span className="guide-callout__label">{label}</span>
      </div>
      <div className="guide-callout__body">{stripLeadingLabel(children)}</div>
    </blockquote>
  );
}
