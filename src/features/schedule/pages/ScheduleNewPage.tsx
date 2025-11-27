'use client';

import { useContext, useEffect } from 'react';

import AppBarForMobile from '../components/new/AppBarForMobile';
import HeaderForDesktop from '../components/new/HeaderForDesktop';
import MainContent from '../components/new/MainContent';
import { ScheduleFormContext } from '../contexts/ScheduleFormContext';
import GrayBackground from '@/components/GrayBackground';
import NavBar from '@/components/NavBar';
import BackButtonAlert from '@/components/alert/BackButtonAlert';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import { useParams } from 'next/navigation';

export default function ScheduleNewPage() {
  const { setFooterVisible } = useContext(FooterContext);
  const { isBackButtonAlertOpen, setIsBackButtonAlertOpen, isScheduleEdited } =
    useContext(ScheduleFormContext);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  });

  return (
    <>
      <GrayBackground device="desktop" breakpoint="sm" />
      <NavBar className="hidden sm:flex" shadow={false} />
      <AppBarForMobile />
      <div className="sm:px-4">
        <HeaderForDesktop />
        <MainContent />
      </div>
      {isBackButtonAlertOpen && isScheduleEdited && (
        <BackButtonAlert
          backHref={`/events/${params.id}`}
          setIsOpen={setIsBackButtonAlertOpen}
        />
      )}
    </>
  );
}
