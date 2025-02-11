import SettingList from './SettingList/SettingList';

export default function SettingSection() {
  return (
    <section>
      <div className="px-4 py-1">
        <h1 className="text-gray-80 title-sm-300">서비스</h1>
      </div>
      <SettingList />
    </section>
  );
}
