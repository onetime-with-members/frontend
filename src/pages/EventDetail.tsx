import FloatingButtonSection from '../components/section/event-detail/FloatingButtonSection';
import TimeBlockBoard from '../components/time-block/TimeBlockBoard';

export default function EventDetail() {
  return (
    <div className="px-4">
      <div className="mx-auto mt-4 max-w-screen-sm">
        <header className="flex items-center justify-between">
          <h1 className="title-lg-300 text-gray-90">
            유니브핏 정기 회의 일정~
          </h1>
          <button className="text-md-200 rounded-xl bg-primary-40 px-4 py-2 text-gray-00">
            공유하기
          </button>
        </header>
        <main className="mb-28 mt-12">
          <TimeBlockBoard />
          <FloatingButtonSection />
        </main>
      </div>
    </div>
  );
}
