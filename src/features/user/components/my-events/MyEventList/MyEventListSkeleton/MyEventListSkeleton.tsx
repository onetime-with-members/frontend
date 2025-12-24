import MyEvent from '../../../shared/MyEvent';
import { defaultMyEvent } from '@/features/user/constants';

export default function MyEventListSkeleton() {
  return Array.from({ length: 4 }).map((_, index) => (
    <MyEvent key={index} event={defaultMyEvent} isPending={true} />
  ));
}
