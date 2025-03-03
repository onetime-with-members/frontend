import { useTranslations } from 'next-intl';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import Input from '@/components/Input/Input';
import { EventValueType } from '@/types/event.type';

interface TitleSectionProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function TitleSection({ value, setValue }: TitleSectionProps) {
  const t = useTranslations('eventForm');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 50) return;
    setValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <EventInputLabel
        labelId="title"
        labelText={t('eventName')}
        description={t('max50Characters')}
      />
      <Input
        type="text"
        id="title"
        name="title"
        placeholder={t('enterEventName')}
        value={value.title}
        onChange={handleChange}
      />
    </div>
  );
}
