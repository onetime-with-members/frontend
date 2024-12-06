import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout';
import Layout from './layouts/Layout';
import MyPageLayout from './layouts/MyPageLayout';
import EventCreate from './pages/EventCreate';
import EventDetail from './pages/EventDetail';
import EventDetailRedirect from './pages/EventDetailRedirect';
import EventEdit from './pages/EventEdit';
import Home from './pages/Home';
import Login from './pages/Login';
import MyEvents from './pages/MyEvents';
import MyScheduleCreate from './pages/MyScheduleCreate';
import MyScheduleEdit from './pages/MyScheduleEdit';
import MySchedules from './pages/MySchedules';
import NotFoundPage from './pages/NotFoundPage';
import NotFoundRedirect from './pages/NotFoundRedirect';
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
        element: <Home />,
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
          {
            path: 'edit',
            element: <EventEdit />,
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
            element: <MyPageLayout />,
            children: [
              {
                path: 'events',
                element: <MyEvents />,
              },
              {
                path: 'profile',
                element: <ProfilePage />,
              },
              {
                path: 'schedules',
                element: <MySchedules />,
              },
            ],
          },
          {
            path: 'mypage/schedules/new',
            element: <MyScheduleCreate />,
          },
          {
            path: 'mypage/schedules/:myScheduleId/edit',
            element: <MyScheduleEdit />,
          },
          {
            path: 'mypage/profile/edit',
            element: <ProfileEdit />,
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
      {
        path: 'not-found',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundRedirect />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
