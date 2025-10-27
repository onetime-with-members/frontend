import { RemoteRecommendedScheduleType } from './RemoteRecommendedScheduleType';

export class RecommendedScheduleType {
  private readonly _timePoint: string;
  private readonly _startTime: string;
  private readonly _endTime: string;
  private readonly _possibleCount: number;
  private readonly _impossibleCount: number;
  private readonly _possibleNames: string[];
  private readonly _impossibleNames: string[];

  constructor(recommendedSchedule: RemoteRecommendedScheduleType) {
    this._timePoint = recommendedSchedule.time_point;
    this._startTime = recommendedSchedule.start_time;
    this._endTime = recommendedSchedule.end_time;
    this._possibleCount = recommendedSchedule.possible_count;
    this._impossibleCount = recommendedSchedule.impossible_names.length;
    this._possibleNames = recommendedSchedule.possible_names;
    this._impossibleNames = recommendedSchedule.impossible_names;
  }

  static fromResponse(
    recommendedSchedules: RemoteRecommendedScheduleType[],
  ): RecommendedScheduleType[] {
    return recommendedSchedules.map(
      (recommendedSchedule) => new RecommendedScheduleType(recommendedSchedule),
    );
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

  get possibleCount(): number {
    return this._possibleCount;
  }

  get impossibleCount(): number {
    return this._impossibleCount;
  }

  get possibleNames(): string[] {
    return this._possibleNames;
  }

  get impossibleNames(): string[] {
    return this._impossibleNames;
  }
}
