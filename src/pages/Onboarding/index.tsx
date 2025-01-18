import { useEffect, useState } from 'react';

import NicknameFormScreen from './NicknameFormScreen';
import WelcomeScreen from './WelcomeScreen';

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="px-4">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-6">
        <NicknameFormScreen
          page={page}
          setPage={setPage}
          setName={setName}
          isVisible={page === 0}
        />
        <WelcomeScreen name={name} isVisible={page === 1} />
      </div>
    </div>
  );
}
