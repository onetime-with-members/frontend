import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import NicknameFormScreen, { NicknameFormType } from './NicknameFormScreen';
import PageIndicator from './PageIndicator';
import PrivacyScreen from './PrivacyScreen';
import SleepTimeScreen from './SleepTimeScreen';
import TopAppBar from './TopAppBar';
import WelcomeScreen from './WelcomeScreen';

export default function Onboarding() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [value, setValue] = useState<NicknameFormType>({
    name: '',
  });
  const [registerToken, setRegisterToken] = useState('');

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleBackButtonClick() {
    if (page === 1) {
      return navigate(-1);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  }

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
    <div>
      <TopAppBar handleBackButtonClick={handleBackButtonClick} />
      <div className="px-4">
        <div className="mx-auto w-full max-w-screen-sm">
          <PageIndicator pageMaxNumber={3} page={page} />
          <>
            <PrivacyScreen isVisible={page === 1} setPage={setPage} />
            <NicknameFormScreen
              isVisible={page === 2}
              setPage={setPage}
              setName={setName}
              value={value}
              setValue={setValue}
              registerToken={registerToken}
            />
            <SleepTimeScreen isVisible={page === 3} setPage={setPage} />
            <WelcomeScreen isVisible={page === 4} name={name} />
          </>
        </div>
      </div>
    </div>
  );
}
