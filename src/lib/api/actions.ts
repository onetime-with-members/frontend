import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

import { PolicyFormType } from '../validation/form-types';
import apiClient from './axios';
import {
  EventType,
  MemberFilterType,
  RecommendedScheduleType,
} from '@/features/event/models';
import { ScheduleType } from '@/features/schedule/models';
import { OnboardingValuesType } from '@/features/user/models';
import { OnboardingRequest } from '@/features/user/models/OnboardingRequest';
import { Session } from '@/models';

export async function fetchFilteredRecommendedTimes({
  eventId,
  filter,
}: {
  eventId: string;
  filter: MemberFilterType;
}) {
  const res = await apiClient.post(`/events/${eventId}/most/filtering`, {
    users: filter.users,
    members: filter.guests,
  });
  const recommendedTimes = RecommendedScheduleType.fromResponse(
    res.data.payload,
  );
  return recommendedTimes;
}

export async function fetchFilteredSchedules({
  eventId,
  category,
  filter,
}: {
  eventId: string;
  category: EventType['category'];
  filter: MemberFilterType;
}) {
  const res = await apiClient.post(
    `/schedules/${category.toLowerCase()}/${eventId}/filtering`,
    {
      users: filter.users,
      members: filter.guests,
    },
  );
  return ScheduleType.fromResponse(res.data.payload);
}

export async function createUserAction(values: OnboardingValuesType) {
  const res = await apiClient.post(
    '/users/onboarding',
    new OnboardingRequest(values).toObject(),
  );
  return res.data.payload;
}

export async function deleteEventAction(eventId: string) {
  const res = await apiClient.delete(`/events/${eventId}`);
  return res.data.payload;
}

export async function bannerClickAction(id: number) {
  const res = await apiClient.patch(`/banners/${id}/clicks`, {
    click_count: id,
  });
  return res.data.payload;
}

export async function editUserLanguageAction(language: 'KOR' | 'ENG') {
  const res = await apiClient.patch('/users/profile/action-update', {
    language,
  });
  return res.data.payload;
}

export async function editUserPolicyAction(policy: PolicyFormType) {
  const res = await apiClient.put('/users/policy', {
    service_policy_agreement: policy.servicePolicy,
    privacy_policy_agreement: policy.privacyPolicy,
    marketing_policy_agreement: policy.marketingPolicy,
  });
  return res.data.payload;
}

export async function withdrawAction() {
  const res = await apiClient.post('/users/action-withdraw');
  return res.data.payload;
}

export async function checkNewGuestAction({
  eventId,
  name,
}: {
  eventId: string;
  name: string;
}) {
  const res = await apiClient.post('/members/name/action-check', {
    event_id: eventId,
    name,
  });
  return res.data.payload;
}

export async function loginGuestAction({
  eventId,
  name,
  pin,
}: {
  eventId: string;
  name: string;
  pin: string;
}) {
  try {
    const res = await apiClient.post('/members/action-login', {
      event_id: eventId,
      name,
      pin,
    });
    return {
      guestId: res.data.payload.member_id as string,
      pinNotCorrect: false,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.status === 404) {
      return { guestId: '', pinNotCorrect: true };
    }
    return { guestId: '', pinNotCorrect: false };
  }
}

export async function createNewMemberScheduleAction({
  event,
  name,
  pin,
  schedule,
}: {
  event: EventType;
  name: string;
  pin: string;
  schedule: ScheduleType['schedules'];
}) {
  const res = await apiClient.post('/members/action-register', {
    event_id: event.eventId,
    name,
    pin,
    schedules: schedule,
  });
  return res.data.payload;
}

export async function updateScheduleAction({
  event,
  guestId,
  schedule,
}: {
  event: EventType;
  guestId: string;
  schedule: ScheduleType['schedules'];
}) {
  const res = await apiClient.post(
    `/schedules/${event.category.toLowerCase()}`,
    {
      event_id: event.eventId,
      member_id: guestId,
      schedules: schedule,
    },
  );
  return res.data.payload;
}

export async function signOutAction() {
  const { refreshToken }: Session = JSON.parse(
    (await getCookie('session')) as string,
  );
  const res = await apiClient.post('/users/logout', {
    refresh_token: refreshToken,
  });
  return res.data.payload;
}
