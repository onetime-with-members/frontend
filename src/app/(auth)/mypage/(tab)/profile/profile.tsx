'use client';

import { useTranslations } from 'next-intl';

import Avatar from '@/components/avatar';
import LanguageDropdown from '@/components/dropdown/language-dropdown';
import { signOut } from '@/lib/api/auth.action';
import { userQueryOptions } from '@/lib/api/query-options';
import cn from '@/lib/cn';
import { ProgressLink, useProgressRouter } from '@/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: user } = useQuery({ ...userQueryOptions });

  const router = useRouter();
  const progressRouter = useProgressRouter();
  const t = useTranslations('profile');

  return (
    <div className="flex flex-col gap-7 px-4">
      {/* Profile */}
      <section className="flex flex-col gap-4 rounded-[1.25rem] border border-gray-10 p-6">
        <div className="flex items-center gap-4">
          <Avatar size={64} name={user?.nickname || ''} />
          <div className="flex flex-col gap-1">
            <div className="text-gray-80 title-sm-300">{user?.nickname}</div>
            <div className="text-gray-40 text-sm-200">{user?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <GrayButton
            onClick={() => progressRouter.push('/mypage/profile/edit')}
          >
            {t('editProfile')}
          </GrayButton>
          <GrayButton
            onClick={async () => {
              await signOut();
              router.refresh();
              window.location.href = '/';
            }}
          >
            {t('logout')}
          </GrayButton>
        </div>
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

function GrayButton({
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'w-full rounded-lg bg-gray-05 px-3 py-2 text-gray-60 duration-150 text-sm-200 hover:bg-gray-10 active:bg-gray-10',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
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
