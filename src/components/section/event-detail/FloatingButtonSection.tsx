import { Link, useParams } from 'react-router-dom';

import { IconPlus } from '@tabler/icons-react';

export default function FloatingButtonSection() {
  const params = useParams();

  return (
    <>
      <section className="fixed bottom-8 left-0 flex w-full justify-center">
        <Link
          to={`/events/${params.eventId}/schedules/new`}
          className="flex items-center gap-1 rounded-full bg-gray-90 px-6 py-3 text-gray-00"
        >
          <span className="text-md-200">스케줄 등록</span>
          <IconPlus size={20} />
        </Link>
      </section>
    </>
  );
}
