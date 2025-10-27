import { RemoteTimeType } from './RemoteTimeType';

export class TimeType {
  private readonly _timePoint: string;
  private readonly _times: string[];

  constructor(data: RemoteTimeType) {
    this._timePoint = data.time_point;
    this._times = data.times;
  }

  toRemoteType(): RemoteTimeType {
    return {
      time_point: this._timePoint,
      times: this._times,
    };
  }

  get timePoint(): string {
    return this._timePoint;
  }

  get times(): string[] {
    return this._times;
  }
}
