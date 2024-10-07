import dayjs from 'dayjs';
import { HelmetProvider } from 'react-helmet-async';

import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'dayjs/locale/ko';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';

dayjs.locale('ko');
dayjs.extend(localeData);
dayjs.extend(customParseFormat);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Router />
      </HelmetProvider>
    </QueryClientProvider>
  );
}
