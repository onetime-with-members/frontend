declare global {
  interface Window {
    gtag: unknown;
    clarity: unknown;
  }
}

export default function useConsentUpdate() {
  function acceptCookies() {
    updateConsentMode(true);
  }

  function rejectCookies() {
    updateConsentMode(false);
  }

  function updateConsentMode(isAccepted: boolean) {
    const value = isAccepted ? 'granted' : 'denied';

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }

    if (typeof window.clarity === 'function') {
      window.clarity('consentv2', {
        ad_Storage: value,
        analytics_Storage: value,
      });
    }
  }

  return { acceptCookies, rejectCookies };
}
