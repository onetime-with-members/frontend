import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import MemberLoginScreen from '../components/screens/schedule-create/MemberLoginScreen';
import ScheduleFormScreen from '../components/screens/schedule-create/ScheduleFormScreen';
import { MemberValue } from '../types/member.type';
import { Schedule } from '../types/schedule.type';
import { IconChevronLeft } from '@tabler/icons-react';

export default function ScheduleCreate() {
  const isLoggedIn = localStorage.getItem('access-token') !== null;

  const [pageIndex, setPageIndex] = useState(isLoggedIn ? 1 : 0);
  const [isNewMember, setIsNewMember] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberValue, setMemberValue] = useState<MemberValue>({
    name: '',
    pin: '',
  });
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      name: '본인',
      schedules: [],
    },
  ]);

  const params = useParams<{ eventId: string }>();

  const navigate = useNavigate();

  function handleBackButtonClick() {
    if (pageIndex === 0) {
      navigate(`/events/${params.eventId}`);
    } else if (pageIndex === 1) {
      if (isLoggedIn) {
        navigate(`/events/${params.eventId}`);
      } else {
        setPageIndex((prev) => prev - 1);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>스케줄 등록 - OneTime</title>
      </Helmet>
      <div className="px-4">
        <header className="h-[67px]">
          <div className="fixed left-0 top-0 z-40 w-full bg-white px-4">
            <div className="mx-auto grid max-w-screen-sm grid-cols-3 py-5">
              <div className="flex items-center">
                <button onClick={handleBackButtonClick}>
                  <IconChevronLeft size={24} className="text-gray-80" />
                </button>
              </div>
              <h2 className="text-center text-gray-90 text-lg-300">
                {pageIndex === 0 ? '정보 입력' : '스케줄 등록'}
              </h2>
            </div>
          </div>
        </header>
        <main className="mx-auto mt-4 max-w-screen-sm">
          {pageIndex === 0 && (
            <MemberLoginScreen
              setPageIndex={setPageIndex}
              setMemberId={setMemberId}
              memberValue={memberValue}
              setMemberValue={setMemberValue}
              setIsNewMember={setIsNewMember}
            />
          )}
          {pageIndex === 1 && (
            <ScheduleFormScreen
              memberId={memberId}
              isNewMember={isNewMember}
              memberValue={memberValue}
              schedules={schedules}
              setSchedules={setSchedules}
              isLoggedIn={isLoggedIn}
            />
          )}
        </main>
      </div>
    </>
  );
}
