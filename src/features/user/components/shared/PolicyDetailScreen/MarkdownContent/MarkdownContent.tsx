import { useLocale } from 'next-intl';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import { PolicyDetailContext } from '@/features/user/contexts/PolicyDetailContext';
import privacyMarkdownEN from '@/markdowns/privacy-en';
import privacyMarkdownKO from '@/markdowns/privacy-ko';
import serviceMarkdownEN from '@/markdowns/service-en';
import serviceMarkdownKO from '@/markdowns/service-ko';

export default function MarkdownContent() {
  const { page } = useContext(PolicyDetailContext);

  const locale = useLocale();

  return (
    <div className="markdown-body scrollbar-hidden flex-1 overflow-scroll bg-gray-00 px-4 md:rounded-2xl md:p-8">
      {page === 'servicePolicy' && (
        <ReactMarkdown>
          {locale === 'ko' ? serviceMarkdownKO : serviceMarkdownEN}
        </ReactMarkdown>
      )}
      {page === 'privacyPolicy' && (
        <ReactMarkdown>
          {locale === 'ko' ? privacyMarkdownKO : privacyMarkdownEN}
        </ReactMarkdown>
      )}
    </div>
  );
}
