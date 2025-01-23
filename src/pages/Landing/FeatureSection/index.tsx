import RecommendAndParticipantsFeature from './RecommendAndParticipantsFeature';
import TimeBlockBoardFeature from './TimeBlockBoardFeature';

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-4 px-4 pt-20">
      <RecommendAndParticipantsFeature />
      <TimeBlockBoardFeature />
    </section>
  );
}
