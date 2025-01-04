import NavBar from '../../components/NavBar';
import CardSection from './components/section/CardSection';
import FirstSection from './components/section/FirstSection';
import LastSection from './components/section/LastSection';
import TypoSection from './components/section/TypoSection';

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
