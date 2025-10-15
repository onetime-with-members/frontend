'use client';

import { useUserQuery } from '../api';
import AppBarForMobile from '../components/profile-edit/AppBarForMobile';
import FormContent from '../components/profile-edit/FormContent';
import GrayBackgroundForDesktop from '../components/profile-edit/GrayBackgroundForDesktop';
import HeaderForDesktop from '../components/profile-edit/HeaderForDesktop';
import NavBarForDesktop from '../components/profile-edit/NavBarForDesktop';
import { defaultUser } from '../constants';

export default function ProfileEditPage() {
  const { data: user } = useUserQuery();

  return (
    <>
      <GrayBackgroundForDesktop />
      <NavBarForDesktop />
      <AppBarForMobile />
      <main>
        <HeaderForDesktop />
        <FormContent user={user || defaultUser} />
      </main>
    </>
  );
}
