import { MostPossibleTime } from './MostPossibleTime';
import { RemoteMyEventType } from './RemoteMyEvent';

export class MyEventType {
  private readonly _title: string;
  private readonly _participantCount: number;
  private readonly _createdDate: string;
  private readonly _eventId: string;
  private readonly _category: 'DATE' | 'DAY';
  private readonly _mostPossibleTimes: MostPossibleTime[];

  constructor(myEvent?: RemoteMyEventType) {
    this._title = myEvent?.title ?? '';
    this._participantCount = myEvent?.participant_count ?? 0;
    this._createdDate = myEvent?.created_date ?? '';
    this._eventId = myEvent?.event_id ?? '';
    this._category = myEvent?.category ?? 'DATE';
    this._mostPossibleTimes =
      myEvent?.most_possible_times.map(
        (mostPossibleTime) => new MostPossibleTime(mostPossibleTime),
      ) ?? [];
  }

  get title(): string {
    return this._title;
  }

  get participantCount(): number {
    return this._participantCount;
  }

  get createdDate(): string {
    return this._createdDate;
  }

  get eventId(): string {
    return this._eventId;
  }

  get category(): 'DATE' | 'DAY' {
    return this._category;
  }

  get mostPossibleTimes(): MostPossibleTime[] {
    return this._mostPossibleTimes;
  }
}
