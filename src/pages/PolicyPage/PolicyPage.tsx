import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import PolicyDetailScreen from '@/components/policy/PolicyDetailScreen/PolicyDetailScreen';
import { PolicyKeyType } from '@/types/user.type';

interface PolicyPageProps {
  page: PolicyKeyType;
}

export default function PolicyPage({ page }: PolicyPageProps) {
  const navigate = useNavigate();

  const pageTitle =
    page === 'service_policy_agreement'
      ? '서비스 이용약관'
      : '개인정보 수집 및 이용 동의';

  function handlePageDetailClose() {
    navigate(-1);
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle} | OneTime</title>
      </Helmet>
      <PolicyDetailScreen
        page={page}
        pageTitle={pageTitle}
        onClose={handlePageDetailClose}
      />
    </>
  );
}
