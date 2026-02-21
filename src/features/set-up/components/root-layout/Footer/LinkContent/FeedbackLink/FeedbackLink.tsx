import { useTranslations } from 'next-intl';

import { SpeakerphoneIcon } from '@/components/icon';

export default function FeedbackLink() {
  const t = useTranslations('setUp.components.Footer');

  return (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSfDuttkDxmZDZbHhawL5GSJOgOOelOTFFgoomRVWYHWlEP9Qg/viewform?usp=dialog"
      className="flex items-center gap-1 text-gray-00"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="text-base">
        <SpeakerphoneIcon />
      </span>
      <span className="text-sm-300">{t('feedbackIssue')}</span>
    </a>
  );
}
