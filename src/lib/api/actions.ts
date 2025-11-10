import { getCookie } from 'cookies-next';

import apiClient from './axios';
import { OnboardingType, PolicySchema, Session } from '@/features/user/types';

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

export async function signOutAction() {
  const { refreshToken }: Session = JSON.parse(
    (await getCookie('session')) as string,
  );
  const res = await apiClient.post('/users/logout', {
    refresh_token: refreshToken,
  });
  return res.data.payload;
}
