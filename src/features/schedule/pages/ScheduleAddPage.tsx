'use client';

import { useContext, useEffect } from 'react';

import AppBarForMobile from '../components/AppBarForMobile';
import HeaderForDesktop from '../components/HeaderForDesktop';
import MainContent from '../components/MainContent';
import { ScheduleFormContext } from '../contexts/ScheduleFormContext';
import BackButtonAlert from '@/components/alert/back-button-alert';
import GrayBackground from '@/components/gray-background';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function ScheduleAddPage({
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
