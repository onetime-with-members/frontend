import StartButton from './StartButton';
import WelcomeContent from './WelcomeContent';
import cn from '@/utils/cn';

interface WelcomeScreenProps {
  name: string;
  isVisible: boolean;
}

export default function WelcomeScreen({ name, isVisible }: WelcomeScreenProps) {
  return (
    <section
      className={cn(
        'flex flex-1 -translate-y-16 flex-col items-center justify-center gap-12',
        {
          hidden: !isVisible,
        },
      )}
    >
      <WelcomeContent name={name} />
      <StartButton />
    </section>
  );
}
