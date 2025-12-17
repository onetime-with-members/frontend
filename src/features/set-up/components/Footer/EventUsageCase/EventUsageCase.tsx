import { ProgressLink } from '@/navigation';
import { IconCalendarEvent } from '@tabler/icons-react';

export default function EventUsageCase() {
  return (
    <div className="flex items-center gap-3">
      <span
        id="usage-case-label"
        className="flex items-center gap-1 text-gray-00 text-sm-300"
      >
        <span aria-hidden="true">
          <IconCalendarEvent size={16} />
        </span>
        <span>사용 사례</span>
      </span>
      <ul
        aria-labelledby="usage-case-label"
        className="flex items-center gap-1.5 text-gray-40 text-sm-100"
      >
        <li>
          <ProgressLink href="/events/team-meeting">팀 회의</ProgressLink>
        </li>
        <li aria-hidden="true">|</li>
        <li>
          <ProgressLink href="/events/business-one-on-one">
            1:1 비즈니스 미팅
          </ProgressLink>
        </li>
        <li aria-hidden="true">|</li>
        <li>
          <ProgressLink href="/events/offline-appointment">
            오프라인 약속
          </ProgressLink>
        </li>
      </ul>
    </div>
  );
}
