import { RemoteScheduleType } from './RemoteScheduleType';
import { TimeType } from './TimeType';

export class ScheduleType {
  private readonly _name: string;
  private readonly _schedules: TimeType[];

  constructor(schedule?: RemoteScheduleType) {
    this._name = schedule?.name ?? '';
    this._schedules =
      schedule?.schedules.map((schedule) => new TimeType(schedule)) ?? [];
  }

  static fromResponse(response: RemoteScheduleType[]): ScheduleType[] {
    return response.map((schedule) => new ScheduleType(schedule));
  }

  get name(): string {
    return this._name;
  }

  get schedules(): TimeType[] {
    return this._schedules;
  }
}
