import NavBar from '../components/NavBar';
import CardSection from '../components/landing/CardSection';
import FirstSection from '../components/landing/FirstSection';
import LastSection from '../components/landing/LastSection';
import TypoSection from '../components/landing/TypoSection';

export default function Landing() {
  return (
    <>
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
