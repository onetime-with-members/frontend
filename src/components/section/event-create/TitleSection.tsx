import Input from '../../Input';
import EventInputLabel from '../../input-label/EventInputLabel';

export default function TitleSection() {
  return (
    <div className="flex flex-col gap-4">
      <EventInputLabel
        labelId="title"
        labelText="이벤트 제목"
        description="최대 15자"
      />
      <Input
        type="text"
        id="title"
        placeholder="어떤 이벤트인가요?"
        maxLength={15}
      />
    </div>
  );
}
