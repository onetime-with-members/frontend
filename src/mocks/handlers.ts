import { HttpResponse, http } from 'msw';

import { defaultEventResponse } from './data';

export const handlers = [
  http.get('/events/*', () => {
    return HttpResponse.json(defaultEventResponse);
  }),
];
