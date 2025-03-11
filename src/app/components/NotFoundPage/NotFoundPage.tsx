'use client';

import MainContent from './MainContent/MainContent';
import NavBar from '@/components/NavBar/NavBar';

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col">
      <NavBar />
      <MainContent />
    </div>
  );
}
