import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../api/axios';
import FloatingBottomButton from '../components/floating-button/FloatingBottomButton';
import Input from '../components/form-control/input/Input';
import { FooterContext } from '../contexts/FooterContext';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function EventEdit() {
  const [value, setValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { setIsFooterVisible } = useContext(FooterContext);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams<{ eventId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data;
    },
  });

  const editEvent = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`/events/${params.eventId}`, {
        title: value.trim(),
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate(-1);
    },
  });

  const eventTitle = data?.payload.title;

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit() {
    editEvent.mutate();
  }

  useEffect(() => {
    if (isLoading) return;
    setValue(eventTitle);
  }, [eventTitle]);

  useEffect(() => {
    if (value.trim() === '' || value.length > 30) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [value]);

  useEffect(() => {
    setIsFooterVisible(false);

    return () => {
      setIsFooterVisible(true);
    };
  }, []);

  if (isLoading || !eventTitle) return null;

  return (
    <>
      <Helmet>
        <title>이벤트 수정 - OneTime</title>
      </Helmet>
      <header className="h-[67px]">
        <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
          <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
            <div className="flex items-center">
              <button onClick={handleBackButtonClick}>
                <IconChevronLeft size={24} className="text-gray-80" />
              </button>
            </div>
            <h2 className="text-center text-gray-90 text-lg-300">
              이벤트 수정
            </h2>
          </div>
        </div>
      </header>
      <div className="px-4">
        {!isLoading && (
          <main className="mx-auto max-w-screen-sm pb-40 pt-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="title" className="text-lg-200">
                  이벤트 제목
                </label>
                <span className="text-gray-40 text-sm-200">최대 30자</span>
              </div>
              <Input
                value={value}
                onChange={handleInputChange}
                maxLength={30}
              />
            </div>
            <FloatingBottomButton onClick={handleSubmit} disabled={isDisabled}>
              확인
            </FloatingBottomButton>
          </main>
        )}
      </div>
    </>
  );
}
