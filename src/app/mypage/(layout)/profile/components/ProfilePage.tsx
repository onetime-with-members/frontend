import ProfileSection from './ProfileSection/ProfileSection';
import SettingSection from './SettingSection/SettingSection';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-7 px-4">
      <ProfileSection />
      <SettingSection />
    </div>
  );
}
