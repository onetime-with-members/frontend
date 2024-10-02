import NavBar from '../components/nav-bar/NavBar';
import CardSection from '../components/section/landing/CardSection';
import FirstSection from '../components/section/landing/FirstSection';
import TypoSection from '../components/section/landing/TypoSection';

export default function Landing() {
  return (
    <>
      <header>
        <NavBar variant="black" />
      </header>
      <main className="pb-40">
        <FirstSection />
        <TypoSection />
        <CardSection />
      </main>
    </>
  );
}
