import EventInputLabel from '../EventInputLabel';
import Input from '@/components/Input';
import { EventValueType } from '@/types/event.type';

interface TitleSectionProps {
  value: EventValueType;
  setValue: React.Dispatch<React.SetStateAction<EventValueType>>;
}

export default function TitleSection({ value, setValue }: TitleSectionProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  }

  return (
    <div className="flex flex-col gap-4">
      <EventInputLabel
        labelId="title"
        labelText="이벤트 제목"
        description="최대 30자"
      />
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="어떤 이벤트인가요?"
        maxLength={30}
        value={value.title}
        onChange={handleChange}
      />
    </div>
  );
}
