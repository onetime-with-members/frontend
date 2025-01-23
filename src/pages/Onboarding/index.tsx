import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import NicknameFormScreen, { NicknameFormType } from './NicknameFormScreen';
import WelcomeScreen from './WelcomeScreen';

export default function Onboarding() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');
  const [value, setValue] = useState<NicknameFormType>({
    name: '',
  });
  const [registerToken, setRegisterToken] = useState('');

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('register_token') || !searchParams.get('name')) {
      return navigate('/login');
    }

    setRegisterToken(searchParams.get('register_token') as string);
    setValue({
      name: searchParams.get('name') as string,
    });

    const newSearchParams = new URLSearchParams();
    newSearchParams.delete('register_token');
    newSearchParams.delete('name');
    setSearchParams(newSearchParams);
  }, []);

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
          isVisible={page === 0}
          page={page}
          setPage={setPage}
          setName={setName}
          value={value}
          setValue={setValue}
          registerToken={registerToken}
        />
        <WelcomeScreen isVisible={page === 1} name={name} />
      </div>
    </div>
  );
}
