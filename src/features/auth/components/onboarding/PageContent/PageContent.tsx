import { useContext } from 'react';

import CompleteModal from '../CompleteModal';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';
import PageIndicator from './PageIndicator';
import PageScreen from './PageScreen';

export default function PageContent() {
  const {
    showCompleteModal,
    setShowCompleteModal,
    finishOnboardingAndGoHome,
  } = useContext(OnboardingContext);

  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
      <PageIndicator />
      <PageScreen />
      <CompleteModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onCancel={() => {
          setShowCompleteModal(false);
          finishOnboardingAndGoHome();
        }}
      />
    </div>
  );
}
