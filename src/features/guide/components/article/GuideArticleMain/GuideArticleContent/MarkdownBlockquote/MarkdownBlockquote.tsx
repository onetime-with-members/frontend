import {
  Children,
  type ComponentPropsWithoutRef,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { type ExtraProps } from 'react-markdown';

import { getNodeText } from '@/features/guide/utils/toc';
import { IconAlertTriangle, IconBulb } from '@tabler/icons-react';

type CalloutKind = 'tip' | 'caution';

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
  const kind: CalloutKind =
    lower === '팁' || lower === 'tip' ? 'tip' : 'caution';
  return { kind, label };
}

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
