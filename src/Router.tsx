import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './layouts/Layout';
import EventCreate from './pages/EventCreate';
import EventDetail from './pages/EventDetail';
import Landing from './pages/Landing';

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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
