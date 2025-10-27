import { RemoteEventType } from './RemoteEventType';
import { EventFormType } from '@/lib/validation/form-types';

export class EventType {
  private readonly _eventId: string;
  private readonly _title: string;
  private readonly _startTime: string;
  private readonly _endTime: string;
  private readonly _category: 'DATE' | 'DAY';
  private readonly _ranges: string[];
  private readonly _status: 'CREATOR' | 'PARTICIPANT';

  constructor(event?: RemoteEventType) {
    this._eventId = event?.event_id ?? '';
    this._title = event?.title ?? '';
    this._startTime = event?.start_time ?? '';
    this._endTime = event?.end_time ?? '';
    this._category = event?.category ?? 'DATE';
    this._ranges = event?.ranges ?? [];
    this._status = event?.event_status ?? 'PARTICIPANT';
  }

  toFormType(): EventFormType {
    return {
      title: this._title,
      start_time: this._startTime,
      end_time: this._endTime,
      category: this._category,
      ranges: this._ranges,
    };
  }

  get eventId() {
    return this._eventId;
  }

  get title() {
    return this._title;
  }

  get startTime() {
    return this._startTime;
  }

  get endTime() {
    return this._endTime;
  }

  get category() {
    return this._category;
  }

  get ranges() {
    return this._ranges;
  }

  get status() {
    return this._status;
  }
}
