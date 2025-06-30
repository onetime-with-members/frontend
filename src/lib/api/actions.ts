'use server';

import {
  CRAWLING_SERVER_API_URL,
  SERVER_API_URL,
  defaultUser,
} from '../constants';
import dayjs from '../dayjs';
import { EventType, EverytimeSchedule, Session, TimeType } from '../types';
import auth from './auth.server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(
    'session',
    JSON.stringify({
      accessToken,
      refreshToken,
    } satisfies Session),
    {
      expires: dayjs().add(1, 'month').toDate(),
    },
  );

  revalidatePath('/');
}

export async function signOut() {
  const { data: session } = await auth();

  const res = await fetch(`${SERVER_API_URL}/users/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: session?.refreshToken,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    return defaultUser;
  }

  const cookieStore = await cookies();
  cookieStore.delete('session');

  revalidatePath('/');
}

export async function accessToken() {
  const { data: session } = await auth();
  if (!session) throw new Error('Unauthorized Error');
  return session.accessToken;
}

export async function createEvent(formData: FormData) {
  const { data: session, isLoggedIn } = await auth();

  const event = JSON.parse(formData.get('event') as string);

  const res = await fetch(`${SERVER_API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(isLoggedIn
        ? { Authorization: `Bearer ${session?.accessToken}` }
        : {}),
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to create event');
  }
  const data = await res.json();
  const { event_id } = data.payload;

  redirect(`/events/${event_id}`);
}

export async function editEvent(formData: FormData) {
  const eventId = formData.get('eventId') as string;

  const res = await fetch(`${SERVER_API_URL}/events/${eventId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: formData.get('event'),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit event');
  }

  revalidatePath(`/events/${eventId}`);

  redirect(`/events/${eventId}`);
}

export async function deleteEvent(formData: FormData) {
  const eventId = formData.get('eventId') as string;

  const res = await fetch(`${SERVER_API_URL}/events/${eventId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to delete event');
  }

  redirect('/');
}

export async function editProfile(formData: FormData) {
  const nickname = formData.get('nickname');

  const res = await fetch(`${SERVER_API_URL}/users/profile/action-update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify({
      nickname,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit profile');
  }

  revalidatePath('/mypage/profile');
}

export async function editUserLanguage(formData: FormData) {
  const language = formData.get('language');

  console.log(language);

  const res = await fetch(`${SERVER_API_URL}/users/profile/action-update`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify({
      language,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit user language');
  }
  console.log(await res.json());
}

export async function editMySchedule(formData: FormData) {
  const mySchedule = JSON.parse(formData.get('mySchedule') as string);

  const res = await fetch(`${SERVER_API_URL}/fixed-schedules`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify({
      schedules: mySchedule,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit my schedule');
  }

  revalidatePath('/');
  revalidatePath('/mypage/schedules');
}

export async function editSleepTime(formData: FormData) {
  const sleepTime = JSON.parse(formData.get('sleepTime') as string);

  const res = await fetch(`${SERVER_API_URL}/users/sleep-time`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify(sleepTime),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit sleep time');
  }

  revalidatePath('/');
  revalidatePath('/mypage/schedules');
}

export async function editPolicy(formData: FormData) {
  const policy = JSON.parse(formData.get('policy') as string);

  const res = await fetch(`${SERVER_API_URL}/users/policy`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await accessToken()}`,
    },
    body: JSON.stringify(policy),
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error('Failed to edit policy');
  }
}

export async function submitEverytimeUrl(formData: FormData) {
  const everytimeUrl = formData.get('everytimeUrl') as string;

  const searchParams = new URLSearchParams({
    url: everytimeUrl,
  });

  const res = await fetch(
    `${CRAWLING_SERVER_API_URL}/schedule?${searchParams.toString()}`,
  );
  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    return { everytimeSchedule: null, error };
  }
  const data = await res.json();
  const everytimeSchedule: EverytimeSchedule = data.payload.schedules;

  return { everytimeSchedule, error: null };
}

export async function checkNewGuest(formData: FormData) {
  const eventId = formData.get('eventId') as string;
  const name = formData.get('name') as string;

  const res = await fetch(`${SERVER_API_URL}/members/name/action-check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_id: eventId,
      name,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    return { isNewGuest: false };
  }
  const data = await res.json();
  const isNewGuest: boolean = data.payload.is_possible;

  return { isNewGuest };
}

export async function loginGuest(formData: FormData) {
  const eventId = formData.get('eventId') as string;
  const name = formData.get('name') as string;
  const pin = formData.get('pin') as string;

  const res = await fetch(`${SERVER_API_URL}/members/action-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_id: eventId,
      name,
      pin,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    if (res.status === 404) {
      return { guestId: '', pinNotCorrect: true };
    }
    return { guestId: '', pinNotCorrect: false };
  }
  const data = await res.json();
  const guestId: string = data.payload.member_id;

  return { guestId, pinNotCorrect: false };
}

export async function createNewMemberSchedule(formData: FormData) {
  const eventId = formData.get('eventId');
  const name = formData.get('name');
  const pin = formData.get('pin');
  const schedules = JSON.parse(formData.get('schedules') as string);

  const res = await fetch(`${SERVER_API_URL}/members/action-register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_id: eventId,
      name,
      pin,
      schedules,
    }),
  });
  if (!res.ok) {
    console.error(await res.json());
    return;
  }

  revalidatePath(`/events/${eventId}`);

  redirect(`/events/${eventId}`);
}

export async function updateSchedule(formData: FormData) {
  const event: EventType = JSON.parse(formData.get('event') as string);
  const guestId = formData.get('guestId');
  const schedules: TimeType[] = JSON.parse(formData.get('schedules') as string);

  const { data: session, isLoggedIn } = await auth();

  const res = await fetch(
    `${SERVER_API_URL}/schedules/${event.category.toLowerCase()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(isLoggedIn
          ? { Authorization: `Bearer ${session?.accessToken}` }
          : {}),
      },
      body: JSON.stringify({
        event_id: event.event_id,
        member_id: guestId,
        schedules,
      }),
    },
  );
  if (!res.ok) {
    console.error(await res.json());
    return;
  }

  revalidatePath(`/events/${event.event_id}`);

  redirect(`/events/${event.event_id}`);
}
