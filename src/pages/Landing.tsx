import { Helmet } from 'react-helmet-async';

import NavBar from '../components/NavBar';
import CardSection from '../components/section/landing/CardSection';
import FirstSection from '../components/section/landing/FirstSection';
import LastSection from '../components/section/landing/LastSection';
import TypoSection from '../components/section/landing/TypoSection';

export default function Landing() {
  return (
    <>
      <Helmet>
        <title>
          OneTime | 원타임으로 쉽고 빠르게 모두가 되는 시간을 찾으세요
        </title>
      </Helmet>
      <header>
        <NavBar />
      </header>
      <main className="w-full">
        <FirstSection />
        <TypoSection />
        <CardSection />
        <LastSection />
      </main>
    </>
  );
}
