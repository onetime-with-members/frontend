import { useNavigate } from 'react-router-dom';

import PolicyDetailScreen from '@/components/policy/PolicyDetailScreen';
import { PolicyKeyType } from '@/types/user.type';

interface PolicyPageProps {
  page: PolicyKeyType;
}

export default function PolicyPage({ page }: PolicyPageProps) {
  const navigate = useNavigate();

  function handlePageDetailClose() {
    navigate(-1);
  }

  return <PolicyDetailScreen page={page} onClose={handlePageDetailClose} />;
}
