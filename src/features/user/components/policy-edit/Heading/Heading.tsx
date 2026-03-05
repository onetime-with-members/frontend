import { useTranslations } from 'next-intl';

export default function Heading() {
  const t = useTranslations('user.pages.PolicyEditPage');

  return (
    <h1 className="text-center text-gray-90 title-lg-300">
      {t.rich('title', { br: () => <br /> })}
    </h1>
  );
}
