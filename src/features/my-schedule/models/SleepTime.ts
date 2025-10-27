import { RemoteSleepTime } from './RemoteSleepTime';

export class SleepTime {
  private readonly _startTime: string;
  private readonly _endTime: string;

  constructor(sleepTime?: RemoteSleepTime) {
    this._startTime = sleepTime?.sleep_start_time ?? '00:00';
    this._endTime = sleepTime?.sleep_end_time ?? '00:00';
  }

  get startTime(): string {
    return this._startTime;
  }

  get endTime(): string {
    return this._endTime;
  }
}
