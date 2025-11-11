import { Banner, BarBanner } from '../types';
import { SERVER_API_URL } from '@/constants';
import apiClient from '@/lib/api';

export async function fetchBanner() {
  const res = await fetch(`${SERVER_API_URL}/admin/banners/activated/all`);
  if (!res.ok) {
    console.error(await res.json());
    return [];
  }
  const data = await res.json();
  const banners: Banner[] = data.payload.banners;

  return banners || [];
}

export async function fetchBarBanner() {
  const res = await fetch(`${SERVER_API_URL}/admin/bar-banners/activated/all`);
  if (!res.ok) {
    console.error(await res.json());
    return null;
  }
  const data = await res.json();
  const barBanners: BarBanner[] = data.payload.bar_banners;

  return barBanners.length !== 0 ? barBanners[0] : null;
}

export async function clickBanner(id: number) {
  const res = await apiClient.patch(`/banners/${id}/clicks`, {
    click_count: id,
  });
  return res.data.payload;
}
