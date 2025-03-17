import RecommendAndParticipantsFeature from './RecommendAndParticipantsFeature/RecommendAndParticipantsFeature';
import TimeBlockBoardFeature from './TimeBlockBoardFeature/TimeBlockBoardFeature';

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-14 px-4 pt-[4.5rem]">
      <RecommendAndParticipantsFeature />
      <TimeBlockBoardFeature />
    </section>
  );
}
