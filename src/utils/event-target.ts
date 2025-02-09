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
