import dayjs from 'dayjs';
import { HelmetProvider } from 'react-helmet-async';

import Router from './Router';
import ContextProviders from './contexts/ContextProviders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/ko';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.locale('ko');
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ContextProviders>
          <Router />
        </ContextProviders>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
