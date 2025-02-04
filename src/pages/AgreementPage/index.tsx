import { useNavigate } from 'react-router-dom';

import AgreementDetailScreen from '@/components/AgreementDetailScreen';
import { AgreementKeyType } from '@/types/user.type';

interface AgreementPageProps {
  page: AgreementKeyType;
}

export default function AgreementPage({ page }: AgreementPageProps) {
  const navigate = useNavigate();

  function handlePageDetailClose() {
    navigate(-1);
  }

  return <AgreementDetailScreen page={page} onClose={handlePageDetailClose} />;
}
