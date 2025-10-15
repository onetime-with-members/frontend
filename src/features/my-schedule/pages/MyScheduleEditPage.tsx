'use client';

import { useState } from 'react';

import FormContent from '../components/edit/FormContent';
import TopAppBar from '../components/edit/TopAppBar/TopAppBar';
import BackButtonAlert from '@/components/alert/back-button-alert';

export default function MyScheduleEditPage() {
  const [isBackButtonAlertOpen, setIsBackButtonAlertOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col">
        <TopAppBar
          onBackButtonAlertOpen={() => setIsBackButtonAlertOpen(true)}
        />
        <main className="pb-24">
          <FormContent />
        </main>
      </div>
      {isBackButtonAlertOpen && (
        <BackButtonAlert backHref={-1} setIsOpen={setIsBackButtonAlertOpen} />
      )}
    </>
  );
}
