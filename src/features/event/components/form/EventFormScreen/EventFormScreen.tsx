'use client';

import FormContent from './FormContent';
import TopNavBar from './TopNavBar';
import GrayBackground from '@/components/gray-background';
import EventFormContextProvider from '@/features/event/contexts/EventFormContext';
import { EventFormStatus } from '@/features/event/models/EventFormStatus';
import { EventFormType } from '@/lib/validation/form-types';

export default function EventFormScreen({
  formStatus,
  originData,
}: {
  formStatus: EventFormStatus;
  originData?: EventFormType;
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
