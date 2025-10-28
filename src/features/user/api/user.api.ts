import apiClient from '@/lib/api';

export async function fetchUserProfile() {
  const res = await apiClient.get('/users/profile');
  return res.data.payload;
}

export async function fetchMyEvents() {
  const res = await apiClient.get('/events/user/all');
  return res.data.payload;
}

export async function editUserNameAction(name: string) {
  const res = await apiClient.patch('/users/profile/action-update', {
    nickname: name,
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
