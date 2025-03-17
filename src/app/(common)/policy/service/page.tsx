import PolicyPage from '../components/PolicyPage';
import { getLocale } from 'next-intl/server';

function getPageTitle(locale: string) {
  return locale === 'ko' ? '서비스 이용약관' : 'Terms of Service';
}

export async function generateMetadata() {
  return {
    title: `${getPageTitle(await getLocale())} | OneTime`,
  };
}

export default async function Service() {
  return (
    <PolicyPage
      page="service_policy_agreement"
      pageTitle={getPageTitle(await getLocale())}
    />
  );
}
