import PolicyPage from '../components/PolicyPage';
import { getLocale } from 'next-intl/server';

function getPageTitle(locale: string) {
  return locale === 'ko' ? '개인정보 수집 및 이용 동의' : 'Privacy Policy';
}

export async function generateMetadata() {
  return {
    title: `${getPageTitle(await getLocale())} | OneTime`,
  };
}

export default async function Privacy() {
  return (
    <PolicyPage
      page="privacy_policy_agreement"
      pageTitle={getPageTitle(await getLocale())}
    />
  );
}
