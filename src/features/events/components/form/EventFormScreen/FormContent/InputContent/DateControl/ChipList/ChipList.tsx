import { useTranslations } from 'next-intl';

import Chip from './Chip';
import { EventFormType } from '@/lib/validation/form-types';

export default function ChipList({
  category,
  setCategory,
  setRanges,
}: {
  category: EventFormType['category'];
  setCategory: (category: EventFormType['category']) => void;
  setRanges: (ranges: EventFormType['ranges']) => void;
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
