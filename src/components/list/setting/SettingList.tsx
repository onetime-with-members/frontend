import SettingItem from './SettingItem';

export default function SettingList() {
  return (
    <ul>
      <SettingItem>
        <span className="text-md-200 text-gray-60">버전 정보</span>
        <span className="text-md-200 text-primary-40">v 1.0.0</span>
      </SettingItem>
      <SettingItem>
        <span className="text-md-200 cursor-pointer text-gray-30">
          서비스 탈퇴하기
        </span>
      </SettingItem>
    </ul>
  );
}
