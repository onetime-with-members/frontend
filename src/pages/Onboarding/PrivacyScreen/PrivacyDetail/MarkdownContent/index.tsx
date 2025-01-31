import ReactMarkdown from 'react-markdown';

import { PageDetailType } from '../..';
import agreementMarkdown from '@/data/markdown/agreement';
import privacyMarkdown from '@/data/markdown/privacy';

interface MarkdownContentProps {
  pageDetail: PageDetailType;
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
