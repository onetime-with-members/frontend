import ProfileActions from './profile-actions';
import Avatar from '@/components/avatar';
import LanguageDropdown from '@/components/dropdown/language-dropdown';
import { auth, currentUser } from '@/lib/auth';
import cn from '@/lib/cn';
import { ProgressLink } from '@/navigation';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const t = await getTranslations('profile');

  return {
    title: `${t('profile')} | OneTime`,
  };
}

export default async function Page() {
  const session = await auth();
  if (!session) redirect('/login');
  const { user } = await currentUser();

  const t = await getTranslations('profile');

  return (
    <div className="flex flex-col gap-7 px-4">
      {/* Profile */}
      <section className="flex flex-col gap-4 rounded-[1.25rem] border border-gray-10 p-6">
        <div className="flex items-center gap-4">
          <Avatar size={64} name={user.nickname || ''} />
          <div className="flex flex-col gap-1">
            <div className="text-gray-80 title-sm-300">{user.nickname}</div>
            <div className="text-gray-40 text-sm-200">{user.email}</div>
          </div>
        </div>
        <ProfileActions />
      </section>

      {/* Setting */}
      <section>
        <div className="px-4 py-1">
          <h1 className="text-gray-80 title-sm-300">{t('service')}</h1>
        </div>
        <div className="flex flex-col gap-12">
          <ul>
            <SettingItem
              href="https://docs.google.com/forms/d/e/1FAIpQLSfDuttkDxmZDZbHhawL5GSJOgOOelOTFFgoomRVWYHWlEP9Qg/viewform?usp=dialog"
              external
            >
              {t('report')}
            </SettingItem>
            <SettingItem href="/policy/service">
              {t('termsOfService')}
            </SettingItem>
            <SettingItem href="/policy/privacy">
              {t('privacyPolicy')}
            </SettingItem>
            <SettingItem>
              <span>{t('version')}</span>
              <span className="text-primary-40">v 1.4.9</span>
            </SettingItem>
            <SettingItem href="/withdraw" className="text-gray-30 text-sm-200">
              {t('withdraw')}
            </SettingItem>
          </ul>

          <div className="px-6">
            <LanguageDropdown />
          </div>
        </div>
      </section>
    </div>
  );
}

function SettingItem({
  children,
  className,
  href,
  external,
  ...rest
}: {
  href?: string;
  external?: boolean;
} & React.HTMLAttributes<HTMLLIElement>) {
  const content = href ? (
    external ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <ProgressLink href={href}>{children}</ProgressLink>
    )
  ) : (
    children
  );

  return (
    <li
      className={cn(
        'flex items-center gap-2 px-6 py-4 text-gray-60 text-md-200',
        className,
      )}
      {...rest}
    >
      {content}
    </li>
  );
}
