import StartButton from './StartButton/StartButton';
import WelcomeContent from './WelcomeContent/WelcomeContent';
import cn from '@/lib/cn';
import { OnboardingValueType } from '@/lib/types';

interface WelcomeScreenProps {
  isVisible: boolean;
  value: OnboardingValueType;
}

export default function WelcomeScreen({
  isVisible,
  value,
}: WelcomeScreenProps) {
  return (
    <section
      className={cn(
        'flex flex-1 -translate-y-6 flex-col items-center justify-center gap-12 md:-translate-y-16',
        {
          hidden: !isVisible,
        },
      )}
    >
      <WelcomeContent name={value.nickname} />
      <StartButton />
    </section>
  );
}
