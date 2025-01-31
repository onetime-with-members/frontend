import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import NicknameFormScreen, { NicknameFormType } from './NicknameFormScreen';
import PageIndicator from './PageIndicator';
import PrivacyScreen from './PrivacyScreen';
import SleepTimeScreen from './SleepTimeScreen';
import TopAppBarForMobile from './TopAppBarForMobile';
import TopNavBarForDesktop from './TopNavBarForDesktop';
import WelcomeScreen from './WelcomeScreen';
import { FooterContext } from '@/contexts/FooterContext';
import cn from '@/utils/cn';

export default function Onboarding() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [value, setValue] = useState<NicknameFormType>({
    name: '',
  });
  const [registerToken, setRegisterToken] = useState('');

  const { setIsFooterVisible } = useContext(FooterContext);

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
    setIsFooterVisible(false);

    return () => {
      setIsFooterVisible(true);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col md:gap-4">
      <header>
        <TopAppBarForMobile
          handleBackButtonClick={handleBackButtonClick}
          className={cn({
            hidden: page === 4,
          })}
        />
        <TopNavBarForDesktop />
      </header>
      <main className="flex h-full flex-1 flex-col px-4">
        <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
          <PageIndicator
            pageMaxNumber={3}
            page={page}
            className={cn({
              hidden: page === 4,
            })}
          />
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
      </main>
    </div>
  );
}
