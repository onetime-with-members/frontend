import { useTranslations } from 'next-intl';

import { ProgressLink } from '@/navigation';
import { IconCalendarEvent } from '@tabler/icons-react';

export default function EventUseCases() {
  const t = useTranslations('setUp.components.Footer.exampleEvent');

  return (
    <div className="flex items-start gap-3">
      <span
        id="usage-case-label"
        className="flex items-center gap-1 text-gray-00 text-sm-300"
      >
        <span aria-hidden="true">
          <IconCalendarEvent size={16} />
        </span>
        <span>{t('useCases')}</span>
      </span>
      <ul
        aria-labelledby="usage-case-label"
        className="flex flex-1 flex-row flex-wrap items-start gap-1.5 text-gray-40 text-sm-100"
      >
        <li>
          <ProgressLink href="/events/view/team-meeting">
            {t('teamMeetings')}
          </ProgressLink>
        </li>
        <li aria-hidden="true">|</li>
        <li>
          <ProgressLink href="/events/view/business-one-on-one">
            {t('oneOnOneMeetings')}
          </ProgressLink>
        </li>
        <li aria-hidden="true">|</li>
        <li>
          <ProgressLink href="/events/view/social-gatherings">
            {t('socialGatherings')}
          </ProgressLink>
        </li>
      </ul>
    </div>
  );
}
