import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import EventFormContent from '@/components/EventFormContent/EventFormContent';
import { AppDispatch, RootState } from '@/store';
import { editEvent, getEvent } from '@/store/eventSlice';

export default function EventEditPage() {
  const { event, isNotFound, status } = useSelector(
    (state: RootState) => state.event,
  );
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  async function handleSubmit(disabled: boolean) {
    if (disabled || status.edit === 'pending' || !params.eventId) return;
    await dispatch(editEvent(params.eventId));
    navigate(`/events/${params.eventId}`);
  }

  useEffect(() => {
    if (params.eventId) {
      dispatch(getEvent(params.eventId));
    }
  }, [params.eventId]);

  useEffect(() => {
    if (isNotFound) {
      navigate('/not-found');
    }
  }, [isNotFound]);

  useEffect(() => {
    if (event.event_status !== 'CREATOR') {
      navigate(-1);
    }
  }, [event]);

  return <EventFormContent onSubmit={handleSubmit} />;
}
