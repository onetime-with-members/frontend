'use client';

import FormContent from './FormContent';
import TopNavBar from './TopNavBar';
import GrayBackground from '@/components/GrayBackground';
import EventFormContextProvider from '@/features/event/contexts/EventFormContext';
import { EventType } from '@/features/event/types';
import { EventFormStatus } from '@/features/event/types';

export default function EventFormScreen({
  formStatus,
  originData,
}: {
  formStatus: EventFormStatus;
  originData?: EventType;
}) {
  return (
    <EventFormContextProvider formStatus={formStatus} originData={originData}>
      <>
        <GrayBackground device="desktop" breakpoint="md" />
        <TopNavBar />
        <main>
          <FormContent />
        </main>
      </>
    </EventFormContextProvider>
  );
}
