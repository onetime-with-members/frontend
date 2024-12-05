import { RecommendSchedule } from '../../../types/schedule.type';
import MemberBadge from '../../MemberBadge';
import ClockIcon from '../../icon/ClockIcon';

interface RecommendTimeDesktopProps {
  recommendSchedules: RecommendSchedule[];
}

export default function RecommendTimeDesktop({
  recommendSchedules,
}: RecommendTimeDesktopProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-gray-90 text-lg-300">가장 많이 되는 시간대</h2>
      <div className="flex flex-col gap-6">
        {recommendSchedules.map((recommendSchedule, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-2xl bg-gray-00 p-5"
          >
            <div className="flex items-center gap-1">
              <div>
                <ClockIcon />
              </div>
              <div className="flex-1 text-primary-50 text-lg-300">
                {recommendSchedule.start_time} - {recommendSchedule.end_time}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {recommendSchedule.possible_names.length !== 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-primary-50 text-md-300">
                    <span>가능</span>
                    <span>{recommendSchedule.possible_names.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendSchedule.possible_names.map((name, index) => (
                      <MemberBadge key={index} variant="primary">
                        {name}
                      </MemberBadge>
                    ))}
                  </div>
                </div>
              )}
              {recommendSchedule.impossible_names.length !== 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-gray-50 text-md-300">
                    <span>불가능</span>
                    <span>{recommendSchedule.impossible_names.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendSchedule.impossible_names.map((name, index) => (
                      <MemberBadge key={index} variant="gray">
                        {name}
                      </MemberBadge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
