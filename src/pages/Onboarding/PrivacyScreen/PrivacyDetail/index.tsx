import { PageDetailType } from '..';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import TopAppBar from '../../TopAppBar';
import agreementMarkdown from '@/data/markdown/agreement';
import privacyMarkdown from '@/data/markdown/privacy';

interface PrivacyDetailProps {
  pageDetail: PageDetailType;
  setPageDetail: React.Dispatch<React.SetStateAction<PageDetailType>>;
}

export default function PrivacyDetail({
  pageDetail,
  setPageDetail,
}: PrivacyDetailProps) {
  function handlePageDetailClose() {
    setPageDetail(null);
  }

  useEffect(() => {
    document.body.style.overflow = 'auto';

    return () => {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 bg-gray-00">
      <TopAppBar
        pageTitle={
          pageDetail === 'agreement'
            ? '서비스 이용약관'
            : '개인정보 수집 및 이용 동의'
        }
        handleBackButtonClick={handlePageDetailClose}
      />
      <div className="markdown-body px-4">
        {pageDetail === 'agreement' && (
          <ReactMarkdown>{agreementMarkdown}</ReactMarkdown>
        )}
        {pageDetail === 'privacy' && (
          <ReactMarkdown>{privacyMarkdown}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
