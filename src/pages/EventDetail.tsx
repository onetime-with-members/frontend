import NavBar from '../components/nav-bar/event-detail/NavBar';
import Participants from '../components/participants/Participants';
import RecommendTime from '../components/recommend-time/RecommendTime';
import FloatingButtonSection from '../components/section/event-detail/FloatingButtonSection';
import TimeBlockBoard from '../components/time-block/TimeBlockBoard';

export default function EventDetail() {
  return (
    <div>
      <div
        className="px-4 py-6"
        style={{
          background: 'linear-gradient(0deg, #334EDB 0%, #8898F2 100%)',
        }}
      >
        <header className="mx-auto max-w-screen-sm">
          <NavBar />
          <div className="flex items-center justify-between">
            <h1 className="title-md-300 text-gray-00">
              유니브핏 정기 회의 일정~
            </h1>
            <button className="text-md-200 rounded-xl bg-gray-90 px-4 py-2 text-gray-00">
              공유하기
            </button>
          </div>
          <div className="mt-4 flex items-center overflow-x-scroll">
            <div className="flex items-center gap-4">
              <RecommendTime />
              <Participants />
            </div>
          </div>
        </header>
      </div>
      <div className="mx-auto mt-4 max-w-screen-sm px-4">
        <main className="mb-28 mt-12">
          <TimeBlockBoard />
          <FloatingButtonSection />
        </main>
      </div>
    </div>
  );
}
