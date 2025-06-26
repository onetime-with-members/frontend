import axios from './axios';

export async function editUserNameApi(name: string) {
  const res = await axios.patch('/users/profile/action-update', {
    nickname: name,
  });
  return res.data.payload;
}
