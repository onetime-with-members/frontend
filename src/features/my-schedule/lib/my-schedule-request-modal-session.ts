export function createModalSession() {
  sessionStorage.setItem('completeModal', String(true));
}

export function hasModalSession() {
  return !!sessionStorage.getItem('completeModal');
}

export function removeModalSession() {
  sessionStorage.removeItem('completeModal');
}
