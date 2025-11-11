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
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ScheduleNewPage({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const { setFooterVisible } = useContext(FooterContext);
  const {
    pageIndex,
    setPageIndex,
    isBackButtonAlertOpen,
    setIsBackButtonAlertOpen,
    isScheduleEdited,
  } = useContext(ScheduleFormContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();

  function handleBackButtonClick() {
    if (pageIndex === 0) {
      closePage();
    } else if (pageIndex === 1) {
      if (isLoggedIn) {
        closePage();
      } else {
        setPageIndex((prev) => prev - 1);
      }
    }

    function closePage() {
      if (isScheduleEdited) {
        setIsBackButtonAlertOpen(true);
      } else {
        progressRouter.back();
      }
    }
  }

  useEffect(() => {
    setPageIndex(isLoggedIn ? 1 : 0);
  }, [isLoggedIn]);

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
      <AppBarForMobile onBackButtonClick={handleBackButtonClick} />
      <div className="sm:px-4">
        <HeaderForDesktop onBackButtonClick={handleBackButtonClick} />
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
