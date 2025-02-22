import { useTranslation } from 'react-i18next';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import Input from '@/components/Input/Input';
import { EventValueType } from '@/types/event.type';

interface TitleSectionProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function TitleSection({ value, setValue }: TitleSectionProps) {
  const { t } = useTranslation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <EventInputLabel
        labelId="title"
        labelText={t('eventForm.eventName')}
        description={t('eventForm.max50Characters')}
      />
      <Input
        type="text"
        id="title"
        name="title"
        placeholder={t('eventForm.enterEventName')}
        maxLength={50}
        value={value.title}
        onChange={handleChange}
      />
    </div>
  );
}
