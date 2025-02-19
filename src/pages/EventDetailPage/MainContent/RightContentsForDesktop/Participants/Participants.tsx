import { useParticipants } from '../../../EventDetailPage.store';
import Header from '../Header/Header';
import MemberBadge from '@/components/MemberBadge/MemberBadge';

export default function Participants() {
  const participants = useParticipants();

  return (
    <div className="flex flex-col gap-1">
      <Header>
        <span className="flex items-center gap-2">
          <span>참여자</span>
          <span className="text-primary-50">{participants.length}</span>
        </span>
      </Header>
      <div className="flex flex-wrap gap-2 pb-9">
        {participants.map((participant, index) => (
          <MemberBadge key={index} variant="white">
            {participant}
          </MemberBadge>
        ))}
      </div>
    </div>
  );
}
