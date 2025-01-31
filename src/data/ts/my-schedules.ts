import { MySchedule } from '@/types/schedule.type';

const mySchedulesDefault: MySchedule[] = [
  {
    time_point: '월',
    times: ['08:00', '08:30', '09:00'],
  },
  {
    time_point: '화',
    times: ['10:00', '10:30', '11:00'],
  },
  {
    time_point: '수',
    times: ['14:00', '14:30', '15:00'],
  },
  {
    time_point: '목',
    times: ['16:00', '16:30', '17:00'],
  },
  {
    time_point: '금',
    times: ['18:00', '18:30', '19:00'],
  },
  {
    time_point: '토',
    times: ['20:00', '20:30', '21:00'],
  },
  {
    time_point: '일',
    times: ['22:00', '22:30', '23:00'],
  },
];

export default mySchedulesDefault;
