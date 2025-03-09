'use client';

import MainContent from './MainContent/MainContent';
import NavBar from '@/components/NavBar/NavBar';

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col">
      <NavBar />
      <MainContent />
    </div>
  );
}
