import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import SectionHeading from '../../shared/SectionHeading';
import ParticipantFilterItem from './ParticipantFilterItem';
import { HumanIcon } from '@/components/icon';
import { useParticipantsQuery } from '@/features/event/api/event.query';
import { EventParticipantFilterContext } from '@/features/event/contexts/EventParticipantFilterContext';
import { ParticipantType } from '@/features/event/types';
import { isExampleEventSlug } from '@/features/event/utils';
import useToast from '@/hooks/useToast';
import { useParams } from 'next/navigation';

export default function ParticipantFilter() {
  const { filteredParticipants, changeFilteredParticipants } = useContext(
    EventParticipantFilterContext,
  );

  const params = useParams<{ id: string }>();
  const t = useTranslations();

  const toast = useToast();

  const { data: participants } = useParticipantsQuery(params.id);

  function handleFilterItemClick(participant: ParticipantType) {
    if (isExampleEventSlug(params.id)) {
      toast(t('toast.filterInExampleEvent'), { type: 'error' });
    } else {
      changeFilteredParticipants(participant);
    }
  }

  return (
    participants.length > 0 && (
      <>
        <SectionHeading
          icon={<HumanIcon fontSize={20} className="mr-0.5" />}
          status={<>{participants.length}</>}
          className="pt-2"
          sticky
        >
          {t('EventDetailPage.participant', {
            count: participants.length,
          })}
        </SectionHeading>
        <ul
          className="mt-2 flex flex-wrap gap-1.5 pb-4 pt-0 md:pb-6"
          date-testid="participant-list"
        >
          {participants.map((participant) => (
            <ParticipantFilterItem
              key={`${participant.type}${participant.id}`}
              active={filteredParticipants.includes(participant)}
              onClick={() => handleFilterItemClick(participant)}
            >
              {participant.name}
            </ParticipantFilterItem>
          ))}
        </ul>
      </>
    )
  );
}
