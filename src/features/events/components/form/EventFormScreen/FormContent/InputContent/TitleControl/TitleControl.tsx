import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import EventInputLabel from '../EventInputLabel';
import Input from '@/components/input';
import { EventFormContext } from '@/features/events/contexts/EventFormContext';

export default function TitleControl() {
  const { registerTitle } = useContext(EventFormContext);

  const t = useTranslations('eventForm');

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <EventInputLabel
        labelId="title"
        labelText={t('eventName')}
        description={t('max50Characters')}
      />
      <Input {...registerTitle} id="title" placeholder={t('enterEventName')} />
    </div>
  );
}
