import StartButton from './StartButton';
import WelcomeContent from './WelcomeContent';
import { OnboardingValueType } from '@/types/user.type';
import cn from '@/utils/cn';

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
