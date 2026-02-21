import EventUseCases from './EventUseCases';
import FeedbackLink from './FeedbackLink';
import PolicyLinks from './PolicyLinks';

export default function LinkContent() {
  return (
    <div className="flex flex-col gap-4">
      <EventUseCases />
      <div className="flex flex-col gap-2">
        <FeedbackLink />
        <PolicyLinks />
      </div>
    </div>
  );
}
