import { useState } from 'react';

import NicknameFormScreen from '../components/screen/onboarding/NicknameFormScreen';
import WelcomeScreen from '../components/screen/onboarding/WelcomeScreen';

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="px-4">
      <div className="mx-auto flex w-full max-w-screen-sm flex-col gap-6">
        {page === 0 ? (
          <NicknameFormScreen page={page} setPage={setPage} setName={setName} />
        ) : (
          page === 1 && <WelcomeScreen name={name} />
        )}
      </div>
    </div>
  );
}
