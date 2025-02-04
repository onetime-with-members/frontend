import ReactMarkdown from 'react-markdown';

import agreementMarkdown from '@/markdown/agreement';
import privacyMarkdown from '@/markdown/privacy';
import { AgreementKeyType } from '@/types/user.type';

interface MarkdownContentProps {
  pageDetail: AgreementKeyType;
}

export default function MarkdownContent({ pageDetail }: MarkdownContentProps) {
  return (
    <div className="markdown-body scrollbar-hidden flex-1 overflow-scroll px-4 md:rounded-2xl md:p-8">
      {pageDetail === 'service_policy_agreement' && (
        <ReactMarkdown>{agreementMarkdown}</ReactMarkdown>
      )}
      {pageDetail === 'privacy_policy_agreement' && (
        <ReactMarkdown>{privacyMarkdown}</ReactMarkdown>
      )}
    </div>
  );
}
