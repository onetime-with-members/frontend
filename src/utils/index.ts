import { Locale } from 'next-intl';
import { FieldErrors } from 'react-hook-form';

export function eventTarget(event: React.UIEvent): HTMLElement | null {
  if (event.type.includes('mouse') || event.type.includes('click')) {
    return event.target as HTMLElement;
  }
  if (event.type.includes('touch')) {
    const touch = (event as React.TouchEvent).touches[0];
    if (!touch) return null;
    return document.elementFromPoint(
      touch.clientX,
      touch.clientY,
    ) as HTMLElement;
  }
  return null;
}

export function minOf(a: string, b: string) {
  return a < b ? a : b;
}

export function maxOf(a: string, b: string) {
  return a > b ? a : b;
}

export function isNumber(value: string): boolean {
  const regex = /^[0-9]*$/;
  return regex.test(value);
}

export function errorCodes(errors: FieldErrors, key: keyof typeof errors) {
  return Object.values(errors[key]?.types || errors[key]?.type || {});
}

export function formatTimeAmPm(time: string, locale: Locale): string {
  const [hStr, mStr] = time.split(':');

  const h = parseInt(hStr, 10);
  const m = mStr ?? '00';

  const am = locale === 'ko' ? '오전' : 'AM';
  const pm = locale === 'ko' ? '오후' : 'PM';

  if (h === 0) return `${am} 12:${m}`;
  if (h < 12) return `${am} ${h.toString().padStart(2, '0')}:${m}`;
  if (h === 12) return `${pm} 12:${m}`;
  return `${pm} ${(h - 12).toString().padStart(2, '0')}:${m}`;
}
