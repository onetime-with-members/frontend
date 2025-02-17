import { useParticipants } from '../../../EventDetailPage.store';
import MemberBadge from '@/components/MemberBadge/MemberBadge';

export default function Participants() {
  const participants = useParticipants();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-gray-90 text-lg-300">
        <span>참여자</span>
        <span className="text-primary-50">{participants.length}</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {participants.map((participant, index) => (
          <MemberBadge key={index} variant="white">
            {participant}
          </MemberBadge>
        ))}
      </div>
    </div>
  );
}
