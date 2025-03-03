import { Link } from 'react-router-dom';

import EverytimeIcon from '@/components/icon/EverytimeIcon';
import { IconPlus } from '@tabler/icons-react';

export default function EverytimeUI() {
  return (
    <div className="flex items-center justify-between bg-[#FFF3F3] px-5 py-4 text-[#F91F15]">
      <div className="flex items-center gap-2.5">
        <EverytimeIcon size={20} />
        <span className="text-md-300">에브리타임 시간표 등록</span>
      </div>
      <Link to="/mypage/schedules/everytime/edit">
        <IconPlus size={24} />
      </Link>
    </div>
  );
}
