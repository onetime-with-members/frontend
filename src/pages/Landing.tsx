import { Link } from 'react-router-dom';

import calendarImage from '../assets/landing/calendar.svg';
import NavBar from '../components/nav-bar/NavBar';
import FirstSection from '../components/section/landing/FirstSection';

export default function Landing() {
  return (
    <>
      <header>
        <NavBar variant="black" />
      </header>
      <main className="px-4 pb-40">
        <div className="mx-auto max-w-screen-sm">
          <FirstSection />
        </div>
      </main>
    </>
  );
}
