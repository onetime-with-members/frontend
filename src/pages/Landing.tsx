import NavBar from '../components/nav-bar/NavBar';
import FirstSection from '../components/section/landing/FirstSection';

export default function Landing() {
  return (
    <>
      <header>
        <NavBar variant="black" />
      </header>
      <main className="overflow-hidden px-4 pb-40">
        <div className="mx-auto max-w-screen-sm">
          <FirstSection />
        </div>
      </main>
    </>
  );
}
