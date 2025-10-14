import ProfileActions from './ProfileActions';
import ProfileInfo from './ProfileInfo';

export default function ProfileSection() {
  return (
    <section className="flex flex-col gap-4 rounded-[1.25rem] border border-gray-10 p-6">
      <ProfileInfo />
      <ProfileActions />
    </section>
  );
}
