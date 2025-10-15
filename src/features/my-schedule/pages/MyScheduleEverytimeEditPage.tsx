'use client';

import FormContent from '../components/everytime-edit/FormContent';
import TopAppBar from '../components/everytime-edit/TopAppBar';

export default function MyScheduleEverytimeEditPage() {
  return (
    <>
      <TopAppBar />
      <main className="px-4 pb-20 pt-4">
        <FormContent />
      </main>
    </>
  );
}
