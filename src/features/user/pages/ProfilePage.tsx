'use client';

import ProfileSection from '../components/profile/ProfileSection';
import SettingSection from '../components/profile/SettingSection';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-7 px-4">
      <ProfileSection />
      <SettingSection />
    </div>
  );
}
