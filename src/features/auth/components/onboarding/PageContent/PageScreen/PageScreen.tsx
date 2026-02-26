import { useContext } from 'react';

import NicknameFormScreen from './NicknameFormScreen';
import PolicyScreen from './PolicyScreen';
import WelcomeScreen from './WelcomeScreen';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';

export default function PageScreen() {
  const { pageIndex } = useContext(OnboardingContext);

  return (
    <>
      {pageIndex === 0 && <PolicyScreen />}
      {pageIndex === 1 && <NicknameFormScreen />}
      {pageIndex === 2 && <WelcomeScreen />}
    </>
  );
}
