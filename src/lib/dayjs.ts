import dayjs from 'dayjs';

import 'dayjs/locale/ko';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);

dayjs.updateLocale('ko', {
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '1초',
    ss: '%d초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1개월',
    MM: '%d개월',
    y: '1년',
    yy: '%d년',
  },
});

export default dayjs;
