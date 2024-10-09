import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import EventCreate from './pages/EventCreate';
import EventDetail from './pages/EventDetail';
import EventDetailRedirect from './pages/EventDetailRedirect';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Onboarding from './pages/Onboarding';
import ScheduleCreate from './pages/ScheduleCreate';
import Settings from './pages/Settings';
import WithdrawPage from './pages/WithdrawPage';

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
        path: 'onboarding',
        element: <Onboarding />,
      },
      {
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: 'mypage',
            element: <MyPage />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
          {
            path: 'withdraw',
            element: <WithdrawPage />,
          },
        ],
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
