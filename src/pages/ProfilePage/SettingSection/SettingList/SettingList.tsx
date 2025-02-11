import SettingItem from './SettingItem/SettingItem';

export default function SettingList() {
  return (
    <ul>
      <SettingItem href="/policy/service">서비스이용약관</SettingItem>
      <SettingItem href="/policy/privacy">개인정보처리방침</SettingItem>
      <SettingItem>
        <span>버전 정보</span>
        <span className="text-primary-40">v 1.4.4</span>
      </SettingItem>
      <SettingItem href="/withdraw" className="text-gray-30 text-sm-200">
        서비스 탈퇴하기
      </SettingItem>
    </ul>
  );
}
