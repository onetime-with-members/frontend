import ActionButton from './ActionButton';
import { EditIcon, KakaoTalkIcon } from '@/components/icon';
import { ShareIcon } from '@/components/icon/ShareIcon';

export default function FixedTimeHeader() {
  return (
    <div className="flex items-center justify-between pl-2">
      <span className="text-gray-00 text-md-300">일정</span>
      <div className="flex flex-row items-center gap-[6px]">
        <ActionButton className="bg-[#FAE100]">
          <KakaoTalkIcon fontSize={24} innerfill="#FAE100" />
        </ActionButton>
        <ActionButton>
          <ShareIcon fontSize={20} color="#ffffff" />
        </ActionButton>
        <ActionButton>
          <EditIcon fontSize={20} color="#ffffff" />
        </ActionButton>
      </div>
    </div>
  );
}
