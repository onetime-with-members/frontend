import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EventFormContent from '@/components/EventFormContent/EventFormContent';
import { AppDispatch, RootState } from '@/store';
import { createEvent } from '@/store/eventSlice';

export default function EventCreatePage() {
  const { event, status } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  async function handleSubmit(disabled: boolean) {
    if (disabled || status.create === 'pending') return;
    await dispatch(createEvent());
    navigate(`/events/${event.event_id}`);
  }

  return (
    <>
      <Helmet>
        <title>이벤트 생성 | OneTime</title>
      </Helmet>
      <EventFormContent onSubmit={handleSubmit} />
    </>
  );
}
