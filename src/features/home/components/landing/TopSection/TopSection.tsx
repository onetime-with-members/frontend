import MainTitle from './MainTitle';
import TopCTAButton from './TopCTAButton';
import TopVideo from './TopVideo';

export default async function TopSection() {
  return (
    <section>
      <TopVideo />
      <MainTitle />
      <TopCTAButton />
    </section>
  );
}
