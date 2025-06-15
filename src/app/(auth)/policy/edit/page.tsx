import FormContent from './form-content';
import NavBar from '@/components/nav-bar';
import { auth, currentUser } from '@/lib/auth';
import { fetchPolicy } from '@/lib/data';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations('policyEdit');

  return {
    title: `${t('agreeToTerms')} | OneTime`,
  };
}

export default async function Page() {
  if (!(await auth())) {
    notFound();
  }

  const policy = await fetchPolicy();

  if (policy.privacy_policy_agreement && policy.service_policy_agreement) {
    notFound();
  }

  const user = await currentUser();

  const t = await getTranslations('policyEdit');

  return (
    <>
      <NavBar user={user} disabled />
      <div className="px-4 py-12">
        <div className="mx-auto flex w-full max-w-screen-xs flex-col gap-12">
          <h1 className="text-center text-gray-90 title-lg-300">
            {t.rich('title', { br: () => <br /> })}
          </h1>
          <FormContent />
        </div>
      </div>
    </>
  );
}
