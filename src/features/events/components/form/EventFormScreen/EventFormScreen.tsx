'use client';

import FormContent from './FormContent';
import TopNavBar from './TopNavBar';
import GrayBackground from '@/components/gray-background';
import EventFormContextProvider from '@/features/events/contexts/EventFormContext';
import { EventFormStatus } from '@/features/events/models/EventFormStatus';
import { EventType } from '@/lib/types';

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
