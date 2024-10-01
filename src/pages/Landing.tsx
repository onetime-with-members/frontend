import NavBar from '../components/nav-bar/NavBar';
import FirstSection from '../components/section/landing/FirstSection';

export default function Landing() {
  return (
    <>
      <header>
        <NavBar variant="black" />
      </header>
      <main className="pb-40">
        <div className="">
          <FirstSection />
        </div>
      </main>
    </>
  );
}
