import React from 'react'
import { KakaoTalkIcon } from '@/components/icon/KakaoTalkIcon';
import { EditIcon } from '@/components/icon/EditIcon';
import { ShareIcon } from '@/components/icon/ShareIcon';
import { CalendarIcon } from '@/components/icon/CalendarIcon';
import ScheduleButton from './ScheduleButton';

const Schedule = () => {
  return (
    <div className='flex p-[10px] w-full flex-col rounded-2xl bg-gray-70 gap-2'>
      <div className='flex justify-between items-center pl-2'>
        <span className='text-gray-00 text-md-300'>일정</span>
        <div className='flex flex-row gap-[6px] items-center'>
          <ScheduleButton className='bg-[#FAE100]'>
            <KakaoTalkIcon fontSize={24} innerfill="#FAE100" />
          </ScheduleButton>
          
          <ScheduleButton>
            <ShareIcon fontSize={20} color="#ffffff" />
          </ScheduleButton>

          <ScheduleButton>
            <EditIcon fontSize={20} color="#ffffff" />
          </ScheduleButton>
        </div>
      </div>

      <div className='flex px-3 py-2 flex-col items-start rounded-xl bg-gray-60'>
        <div className='flex flex-row gap-1 items-center'>
          <CalendarIcon fontSize={16} />
          <span className='text-gray-00 text-sm-300'>1일 후</span>
        </div>
        <span className='text-gray-00 text-lg-300 font-normal'>2026. 1. 3. 토 오후 6시</span>
      </div>
    </div>
  )
}

export default Schedule