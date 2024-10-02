import NavBar from '../components/nav-bar/NavBar';
import CardSection from '../components/section/landing/CardSection';
import FirstSection from '../components/section/landing/FirstSection';
import LastSection from '../components/section/landing/LastSection';
import TypoSection from '../components/section/landing/TypoSection';

export default function Landing() {
  return (
    <>
      <header>
        <NavBar variant="black" />
      </header>
      <main className="w-full overflow-hidden">
        <FirstSection />
        <TypoSection />
        <CardSection />
        <LastSection />
      </main>
    </>
  );
}
