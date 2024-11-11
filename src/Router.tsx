import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import EventCreate from './pages/EventCreate';
import EventDetail from './pages/EventDetail';
import EventDetailRedirect from './pages/EventDetailRedirect';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MyEvents from './pages/MyEvents';
import MyScheduleCreate from './pages/MyScheduleCreate';
import MyScheduleEdit from './pages/MyScheduleEdit';
import MySchedules from './pages/MySchedules';
import Onboarding from './pages/Onboarding';
import ProfileEdit from './pages/ProfileEdit';
import ProfilePage from './pages/ProfilePage';
import ScheduleCreate from './pages/ScheduleCreate';
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
            children: [
              {
                path: 'events',
                element: <MyEvents />,
              },
              {
                path: 'schedules',
                element: <MySchedules />,
              },
              {
                path: 'schedules/new',
                element: <MyScheduleCreate />,
              },
              {
                path: 'schedules/:myScheduleId/edit',
                element: <MyScheduleEdit />,
              },
            ],
          },
          {
            path: 'mypage/profile',
            children: [
              {
                path: '',
                element: <ProfilePage />,
              },
              {
                path: 'edit',
                element: <ProfileEdit />,
              },
            ],
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
