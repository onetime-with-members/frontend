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
