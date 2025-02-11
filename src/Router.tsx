import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ContextProviders from './contexts/ContextProviders';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import Layout from './layouts/Layout/Layout';
import MyPageLayout from './layouts/MyPageLayout/MyPageLayout';
import EventCreatePage from './pages/EventCreatePage/EventCreatePage';
import EventDetailPage from './pages/EventDetailPage/EventDetailPage';
import EventDetailPageRedirect from './pages/EventDetailPageRedirect/EventDetailPageRedirect';
import EventEditPage from './pages/EventEditPage/EventEditPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MyEventsPage from './pages/MyEventsPage/MyEventsPage';
import MyScheduleEditPage from './pages/MyScheduleEditPage/MyScheduleEditPage';
import MySchedulePage from './pages/MySchedulePage/MySchedulePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import NotFoundPageRedirect from './pages/NotFoundPageRedirect/NotFoundPageRedirect';
import OnboardingPage from './pages/OnboardingPage/OnboardingPage';
import PolicyEditPage from './pages/PolicyEditPage/PolicyEditPage';
import PolicyPage from './pages/PolicyPage/PolicyPage';
import ProfileEditPage from './pages/ProfileEditPage/ProfileEditPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ScheduleCreatePage from './pages/ScheduleCreatePage/ScheduleCreatePage';
import WithdrawPage from './pages/WithdrawPage/WithdrawPage';

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
