'use client';

import { useUserQuery } from '../api';
import AppBarForMobile from '../components/profile-edit/AppBarForMobile';
import FormContent from '../components/profile-edit/FormContent';
import HeaderForDesktop from '../components/profile-edit/HeaderForDesktop';
import { defaultUser } from '../constants';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';

export default function ProfileEditPage() {
  const { data: user } = useUserQuery();

  return (
    <>
      <GrayBackground device="desktop" breakpoint="sm" />
      <NavBar className="hidden sm:flex" />
      <AppBarForMobile />
      <main>
        <HeaderForDesktop />
        <FormContent user={user || defaultUser} />
      </main>
    </>
  );
}
