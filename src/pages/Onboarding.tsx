import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Onboarding() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('register_token')) {
      console.log('register_token', searchParams.get('register_token'));
    }
  }, [searchParams]);

  return <div>온보딩 페이지</div>;
}
