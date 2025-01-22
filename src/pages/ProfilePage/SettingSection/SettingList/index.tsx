import { Link } from 'react-router-dom';

import SettingItem from './SettingItem';

export default function SettingList() {
  return (
    <ul>
      <SettingItem>
        <span className="text-gray-60 text-md-200">버전 정보</span>
        <span className="text-primary-40 text-md-200">v 1.4.3</span>
      </SettingItem>
      <SettingItem>
        <Link
          to="/withdraw"
          className="cursor-pointer text-gray-30 text-md-200"
        >
          서비스 탈퇴하기
        </Link>
      </SettingItem>
    </ul>
  );
}
