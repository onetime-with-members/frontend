import { DENIED, GRANT, GRANTED, REVOKE } from '@/features/set-up/constants';

export default function useUpdateConsent() {
  function updateConsentMode(isAccepted: boolean) {
    updateGoogleConsent(isAccepted);
    updateMSClarityConsent(isAccepted);
    updateMetaPixelConsent(isAccepted);
  }

  function updateGoogleConsent(isAccepted: boolean) {
    const value = isAccepted ? GRANTED : DENIED;
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }
  }

  function updateMSClarityConsent(isAccepted: boolean) {
    const value = isAccepted ? GRANTED : DENIED;
    if (typeof window.clarity === 'function') {
      window.clarity('consentv2', {
        ad_Storage: value,
        analytics_Storage: value,
      });
    }
  }

  function updateMetaPixelConsent(isAccepted: boolean) {
    const value = isAccepted ? GRANT : REVOKE;
    if (typeof window.fbq === 'function') {
      window.fbq('consent', value);
    }
  }

  return {
    updateConsentMode,
  };
}
