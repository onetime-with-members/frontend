import { useTranslations } from 'next-intl';

import Chip from './Chip';
import { EventSchema } from '@/features/event/types';

export default function ChipList({
  category,
  setCategory,
  setRanges,
}: {
  category: EventSchema['category'];
  setCategory: (category: EventSchema['category']) => void;
  setRanges: (ranges: EventSchema['ranges']) => void;
}) {
  const t = useTranslations('eventForm');

  return (
    <div className="flex gap-2">
      <Chip
        type="button"
        active={category === 'DATE'}
        onClick={() => {
          setCategory('DATE');
          setRanges([]);
        }}
      >
        {t('date')}
      </Chip>
      <Chip
        type="button"
        active={category === 'DAY'}
        onClick={() => {
          setCategory('DAY');
          setRanges([]);
        }}
      >
        {t('weekday')}
      </Chip>
    </div>
  );
}
