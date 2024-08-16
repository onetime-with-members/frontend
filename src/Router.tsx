import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './layouts/Layout';
import EventCreate from './pages/EventCreate';
import EventDetail from './pages/EventDetail';
import Landing from './pages/Landing';
import ScheduleAdd from './pages/ScheduleAdd';

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
        path: 'schedules/create',
        element: <EventCreate />,
      },
      {
        path: 'schedules/:id',
        element: <EventDetail />,
      },
      {
        path: 'schedules/new',
        element: <ScheduleAdd />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
