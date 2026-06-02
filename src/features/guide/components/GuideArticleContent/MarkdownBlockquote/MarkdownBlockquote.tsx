import { type ComponentPropsWithoutRef } from 'react';
import { type ExtraProps } from 'react-markdown';

import { getNodeText } from '../../../utils/toc';
import { IconBulb, IconAlertTriangle } from '@tabler/icons-react';

type CalloutKind = 'tip' | 'caution';

// `> 팁: ...`(ko) / `> Tip: ...`(en) → 팁(primary) 박스,
// `> 주의: ...` / `> Caution:` / `> Note:` → 주의(warning) 박스로 렌더링합니다.
// 그 외 인용구는 기본 blockquote 스타일을 유지합니다.
const CALLOUT_PATTERN = /^\s*(팁|Tip|주의|Caution|Note)\s*[:：]/i;

function detectKind(text: string): CalloutKind | null {
  const match = CALLOUT_PATTERN.exec(text);
  if (!match) return null;
  const keyword = match[1].toLowerCase();
  return keyword === '팁' || keyword === 'tip' ? 'tip' : 'caution';
}

// markdown-body의 blockquote 기본 규칙(padding/color/border-left)을 덮어야 하므로
// 배경·테두리·여백 유틸리티에 `!`를 붙입니다.
const STYLES: Record<
  CalloutKind,
  { box: string; icon: typeof IconBulb }
> = {
  tip: {
    box: '!border !border-primary-10 bg-primary-00 [&_strong]:text-primary-60',
    icon: IconBulb,
  },
  caution: {
    box: '!border !border-warning-30 bg-warning-10',
    icon: IconAlertTriangle,
  },
};

export default function MarkdownBlockquote({
  node,
  children,
}: ComponentPropsWithoutRef<'blockquote'> & ExtraProps) {
  const kind = detectKind(getNodeText(node));

  if (!kind) {
    return <blockquote>{children}</blockquote>;
  }

  const { box, icon: Icon } = STYLES[kind];

  return (
    <blockquote
      className={`!my-6 flex gap-3 !rounded-2xl !p-4 !text-gray-80 ${box}`}
    >
      <Icon
        size={20}
        className={
          kind === 'tip'
            ? 'mt-0.5 shrink-0 text-primary-50'
            : 'mt-0.5 shrink-0 text-warning-60'
        }
      />
      <div className="min-w-0 [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
        {children}
      </div>
    </blockquote>
  );
}
