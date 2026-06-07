import GuideIndexHeader from '../components/index/GuideIndexHeader';
import GuideSectionList from '../components/index/GuideSectionList';
import NavBar from '@/components/NavBar';

export default async function GuideIndexPage() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="mx-auto w-full max-w-screen-md px-4 py-10 md:py-14">
        <GuideIndexHeader />
        <GuideSectionList />
      </div>
    </div>
  );
}
