export function addSignOutSession() {
  sessionStorage.setItem('sign-out', String(true));
}

export function hasSignOutSession() {
  return !!sessionStorage.getItem('sign-out');
}

export function deleteSignOutSession() {
  sessionStorage.removeItem('sign-out');
}
