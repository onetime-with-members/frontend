export function createConfirmedEventResponse({
  type,
  oneday,
}: {
  type: 'DATE' | 'DAY';
  oneday: boolean;
}) {
  return {
    code: '200',
    message: '이벤트 조회에 성공했습니다.',
    payload: {
      event_id: '690e3bd3-0506-4a55-abe5-e363bd5410ee',
      title: '새 이벤트',
      start_time: '00:00',
      end_time: '24:00',
      category: type,
      ranges: [
        '2026.02.21',
        '2026.02.22',
        '2026.02.23',
        '2026.02.24',
        '2026.02.25',
        '2026.02.26',
        '2026.02.27',
      ],
      event_status: 'CONFIRMED',
      participation_role: null,
      confirmation: {
        ...getStartEndDateDay({ type, oneday: oneday }),
        start_time: '07:00',
        end_time: '23:00',
        created_date: '2026-02-21T19:54:04.754',
      },
    },
    is_success: true,
  };
}

function getStartEndDateDay({
  type,
  oneday,
}: {
  type: 'DATE' | 'DAY';
  oneday: boolean;
}): {
  start_date: string | null;
  end_date: string | null;
  start_day: string | null;
  end_day: string | null;
} {
  if (type === 'DATE') {
    const startDate = '2026.02.22';
    const endDate = oneday ? startDate : '2026.02.23';
    return {
      start_date: startDate,
      end_date: endDate,
      start_day: null,
      end_day: null,
    };
  } else {
    const startDay = '월';
    const endDay = oneday ? startDay : '금';
    return {
      start_date: null,
      end_date: null,
      start_day: startDay,
      end_day: endDay,
    };
  }
}
