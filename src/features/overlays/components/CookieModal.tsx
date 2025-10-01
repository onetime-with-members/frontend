'use client';

import { useState } from 'react';

import CookieModalButton from './CookieModalButton';

export default function CookieModal() {
  const [isShown, setIsShown] = useState(true);

  function handleReject() {
    setIsShown(false);
  }

  function handleAccept() {
    setIsShown(true);
  }

  return (
    isShown && (
      <div className="fixed bottom-4 right-6 z-[98] flex w-full max-w-[20rem] flex-col gap-4 rounded-2xl bg-gray-00 p-5 shadow-[0_4px_32px_0_rgba(0,0,0,0.10)]">
        <div className="flex flex-col gap-1">
          <h2 className="text-gray-80 text-lg-300">We value your privacy</h2>
          <p className="text-gray-60 text-md-100">
            We use cookies to improve your browsing experience and provide
            personalized services. By clicking “Accept”, you consent to our use
            of cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <CookieModalButton
            onClick={handleReject}
            variant="outline"
            className="flex-1"
          >
            Reject
          </CookieModalButton>
          <CookieModalButton
            onClick={handleAccept}
            variant="primary"
            className="flex-1"
          >
            Accept
          </CookieModalButton>
        </div>
      </div>
    )
  );
}
