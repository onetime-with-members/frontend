import apiClient from '@/lib/api/axios';

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
