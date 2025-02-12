import { useDispatch, useSelector } from 'react-redux';

import EventInputLabel from '../EventInputLabel/EventInputLabel';
import Input from '@/components/Input/Input';
import { AppDispatch, RootState } from '@/store';
import { changeEventValue } from '@/store/eventSlice';

export default function TitleSection() {
  const { eventValue } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeEventValue({ ...eventValue, title: e.target.value }));
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
        value={eventValue.title}
        onChange={handleChange}
      />
    </div>
  );
}
