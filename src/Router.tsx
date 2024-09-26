import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './layouts/Layout';
import EventCreate from './pages/EventCreate';
import EventDetail from './pages/EventDetail';
import EventDetailRedirect from './pages/EventDetailRedirect';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ScheduleCreate from './pages/ScheduleCreate';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Landing />,
      },
      {
        path: 'events/new',
        element: <EventCreate />,
      },
      {
        path: 'events/:eventId',
        children: [
          {
            path: '',
            element: <EventDetail />,
          },
          {
            path: 'schedules/new',
            element: <ScheduleCreate />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: ':shortenEventId',
        element: <EventDetailRedirect />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
