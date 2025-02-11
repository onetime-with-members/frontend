import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ContextProviders from './contexts/ContextProviders';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Layout from './layouts/Layout/Layout';
import MyPageLayout from './layouts/MyPageLayout/MyPageLayout';
import EventCreatePage from './pages/EventCreatePage';
import EventDetailPage from './pages/EventDetailPage';
import EventDetailPageRedirect from './pages/EventDetailPageRedirect';
import EventEditPage from './pages/EventEditPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MyEventsPage from './pages/MyEventsPage';
import MyScheduleEditPage from './pages/MyScheduleEditPage';
import MySchedulePage from './pages/MySchedulePage';
import NotFoundPage from './pages/NotFoundPage';
import NotFoundPageRedirect from './pages/NotFoundPageRedirect';
import OnboardingPage from './pages/OnboardingPage';
import PolicyEditPage from './pages/PolicyEditPage';
import PolicyPage from './pages/PolicyPage';
import ProfileEditPage from './pages/ProfileEditPage';
import ProfilePage from './pages/ProfilePage';
import ScheduleCreatePage from './pages/ScheduleCreatePage';
import WithdrawPage from './pages/WithdrawPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ContextProviders>
        <Layout />
      </ContextProviders>
    ),
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'events/new',
        element: <EventCreatePage />,
      },
      {
        path: 'events/:eventId',
        children: [
          {
            path: '',
            element: <EventDetailPage />,
          },
          {
            path: 'schedules/new',
            element: <ScheduleCreatePage />,
          },
          {
            path: 'edit',
            element: <EventEditPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
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
                element: <MyEventsPage />,
              },
              {
                path: 'profile',
                element: <ProfilePage />,
              },
              {
                path: 'schedules',
                element: <MySchedulePage />,
              },
            ],
          },
          {
            path: 'mypage/schedules/edit',
            element: <MyScheduleEditPage />,
          },
          {
            path: 'mypage/profile/edit',
            element: <ProfileEditPage />,
          },
          {
            path: 'policy',
            children: [
              {
                path: 'service',
                element: <PolicyPage page="service_policy_agreement" />,
              },
              {
                path: 'privacy',
                element: <PolicyPage page="privacy_policy_agreement" />,
              },
              {
                path: 'edit',
                element: <PolicyEditPage />,
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
        element: <EventDetailPageRedirect />,
      },
      {
        path: 'not-found',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <NotFoundPageRedirect />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
