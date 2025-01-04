import clsx from 'clsx';

import { Fragment } from 'react/jsx-runtime';

interface LandingCard {
  title: string;
  description: string;
  imageElement: React.ReactNode;
  textImageGap: number;
  variant?: 'lightPurple' | 'purple';
}

export default function LandingCard({
  title,
  description,
  imageElement,
  textImageGap,
  variant = 'lightPurple',
}: LandingCard) {
  return (
    <div className="mx-auto flex w-full max-w-[342px] justify-center overflow-hidden">
      <div
        className={clsx(
          'relative flex w-full flex-col items-center rounded-2xl px-6 pb-7 pt-10',
          {
            'bg-primary-00': variant === 'lightPurple',
            'bg-primary-40': variant === 'purple',
          },
        )}
        style={{ gap: `${textImageGap}px` }}
      >
        <div className="flex flex-col items-center gap-4">
          <h2
            className={clsx('text-[1.75rem] font-bold', {
              'text-primary-50': variant === 'lightPurple',
              'text-gray-00': variant === 'purple',
            })}
          >
            {title}
          </h2>
          <p
            className={clsx('text-center text-lg-200', {
              'text-primary-30': variant === 'lightPurple',
              'text-gray-00': variant === 'purple',
            })}
          >
            {description.split('\n').map((line, index) => (
              <Fragment key={index}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
        </div>
        {imageElement}
      </div>
    </div>
  );
}
