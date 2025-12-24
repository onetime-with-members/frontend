import { MyEventListType, OnboardingType, PolicySchema } from '../types';
import apiClient from '@/lib/api';

export async function fetchUserProfile() {
  const res = await apiClient.get('/users/profile');
  return res.data.payload;
}

export async function fetchMyEventList({
  size,
  cursor = '',
}: {
  size: number;
  cursor?: string;
}): Promise<MyEventListType> {
  const res = await apiClient.get('/events/user/all', {
    params: {
      size,
      ...(cursor && { cursor }),
    },
  });
  return res.data.payload;
}

export async function fetchUserPolicy() {
  const res = await apiClient.get('/users/policy');
  const {
    service_policy_agreement,
    privacy_policy_agreement,
    marketing_policy_agreement,
  } = res.data.payload;
  return {
    servicePolicy: service_policy_agreement,
    privacyPolicy: privacy_policy_agreement,
    marketingPolicy: marketing_policy_agreement,
  };
}

export async function createUserAction(value: OnboardingType) {
  const res = await apiClient.post('/users/onboarding', {
    register_token: value.registerToken,
    nickname: value.nickname,
    service_policy_agreement: value.servicePolicy,
    privacy_policy_agreement: value.privacyPolicy,
    marketing_policy_agreement: value.marketingPolicy,
    sleep_start_time: value.startSleepTime,
    sleep_end_time: value.endSleepTime,
    language: value.language,
  });
  return res.data.payload;
}

export async function editUserNameAction(name: string) {
  const res = await apiClient.patch('/users/profile/action-update', {
    nickname: name,
  });
  return res.data.payload;
}

export async function editUserLanguageAction(language: 'KOR' | 'ENG') {
  const res = await apiClient.patch('/users/profile/action-update', {
    language,
  });
  return res.data.payload;
}

export async function editUserPolicyAction(policy: PolicySchema) {
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
