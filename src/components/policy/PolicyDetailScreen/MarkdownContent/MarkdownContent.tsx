import ReactMarkdown from 'react-markdown';

import privacyMarkdown from '@/markdowns/privacy-markdown';
import serviceMarkdown from '@/markdowns/service-markdown';
import { PolicyKeyType } from '@/types/user.type';

interface MarkdownContentProps {
  page: PolicyKeyType;
}

export default function MarkdownContent({ page }: MarkdownContentProps) {
  return (
    <div className="markdown-body scrollbar-hidden flex-1 overflow-scroll px-4 md:rounded-2xl md:p-8">
      {page === 'service_policy_agreement' && (
        <ReactMarkdown>{serviceMarkdown}</ReactMarkdown>
      )}
      {page === 'privacy_policy_agreement' && (
        <ReactMarkdown>{privacyMarkdown}</ReactMarkdown>
      )}
    </div>
  );
}
