import { useTranslation } from 'react-i18next';
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
  const { i18n } = useTranslation();

  return (
    <div className="markdown-body scrollbar-hidden flex-1 overflow-scroll px-4 md:rounded-2xl md:p-8">
      {page === 'service_policy_agreement' && (
        <ReactMarkdown>
          {i18n.language === 'ko' ? serviceMarkdownKO : serviceMarkdownEN}
        </ReactMarkdown>
      )}
      {page === 'privacy_policy_agreement' && (
        <ReactMarkdown>
          {i18n.language === 'ko' ? privacyMarkdownKO : privacyMarkdownEN}
        </ReactMarkdown>
      )}
    </div>
  );
}
