import { RemoteMostPossibleTime } from './RemoteMostPossibleTime';

export class MostPossibleTime {
  private readonly _timePoint: string;
  private readonly _startTime: string;
  private readonly _endTime: string;

  constructor(mostPossibleTime: RemoteMostPossibleTime) {
    this._timePoint = mostPossibleTime.time_point;
    this._startTime = mostPossibleTime.start_time;
    this._endTime = mostPossibleTime.end_time;
  }

  get timePoint(): string {
    return this._timePoint;
  }

  get startTime(): string {
    return this._startTime;
  }

  get endTime(): string {
    return this._endTime;
  }
}
