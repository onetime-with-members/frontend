import dayjs from 'dayjs';

import Router from './Router';
import 'dayjs/locale/ko';
import localeData from 'dayjs/plugin/localeData';

dayjs.locale('ko');
dayjs.extend(localeData);

export default function App() {
  return <Router />;
}
