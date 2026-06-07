import EventUseCases from './EventUseCases';
import FeedbackLink from './FeedbackLink';
import GuideLink from './GuideLink';
import PolicyLinks from './PolicyLinks';

export default function LinkContent() {
  return (
    <div className="flex flex-col gap-4">
      <EventUseCases />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <GuideLink />
          <span aria-hidden="true" className="text-gray-50">
            ·
          </span>
          <FeedbackLink />
        </div>
        <PolicyLinks />
      </div>
    </div>
  );
}
