import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';

import privacyMarkdownEN from '@/markdowns/privacy-en';
import privacyMarkdownKO from '@/markdowns/privacy-ko';
import serviceMarkdownEN from '@/markdowns/service-en';
import serviceMarkdownKO from '@/markdowns/service-ko';
import { PolicyKeyType } from '@/types/user.type';

interface MarkdownContentProps {
  page: PolicyKeyType;
}

export default function MarkdownContent({ page }: MarkdownContentProps) {
  const locale = useLocale();

  return (
    <div className="markdown-body scrollbar-hidden flex-1 overflow-scroll bg-gray-00 px-4 md:rounded-2xl md:p-8">
      {page === 'service_policy_agreement' && (
        <ReactMarkdown>
          {locale === 'ko' ? serviceMarkdownKO : serviceMarkdownEN}
        </ReactMarkdown>
      )}
      {page === 'privacy_policy_agreement' && (
        <ReactMarkdown>
          {locale === 'ko' ? privacyMarkdownKO : privacyMarkdownEN}
        </ReactMarkdown>
      )}
    </div>
  );
}
