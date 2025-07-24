import { HeadingForDesktop } from './heading';
import HumanIcon from '@/components/icon/human';
import {
  eventQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
import { defaultEvent } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function ParticipantFilter() {
  const params = useParams<{ id: string }>();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });

  const participants = schedules?.map((schedule) => schedule.name) || [];

  return (
    participants.length > 0 && (
      <>
        <HeadingForDesktop
          icon={<HumanIcon fill="#474A5C" size={20} className="mr-0.5" />}
          status={<>{participants.length}</>}
        >
          참여자
        </HeadingForDesktop>
        <ul className="flex flex-wrap gap-1.5">
          {participants.map((participant, index) => (
            <ParticipantFilterItem key={index}>
              {participant}
            </ParticipantFilterItem>
          ))}
        </ul>
      </>
    )
  );
}

function ParticipantFilterItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-lg border border-gray-20 bg-gray-00 px-2.5 py-1 text-gray-40 text-sm-100">
      {children}
    </li>
  );
}
