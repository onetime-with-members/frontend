import RecommendAndParticipantsFeature from '../feature-section/RecommendAndParticipantsFeature';
import TimeBlockBoardFeature from '../feature-section/TimeBlockBoardFeature';

export default function FeatureSection() {
  return (
    <section className="flex flex-col gap-4 pt-20">
      <RecommendAndParticipantsFeature />
      <TimeBlockBoardFeature />
    </section>
  );
}
