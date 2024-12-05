import MemberBadge from '../../MemberBadge';

interface ParticipantsDesktopProps {
  participants: string[];
}

export default function ParticipantsDesktop({
  participants,
}: ParticipantsDesktopProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-lg-300">
        <span className="text-gray-90">참여자</span>
        <span className="text-primary-50">{participants.length}</span>
      </h2>
      <div className="flex flex-wrap gap-2">
        {participants.map((participant, index) => (
          <MemberBadge key={index} variant="white">
            {participant}
          </MemberBadge>
        ))}
      </div>
    </section>
  );
}
