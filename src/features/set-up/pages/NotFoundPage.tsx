import ImageContent from '../components/not-found/ImageContent';
import TextContent from '../components/not-found/TextContent';
import NavBar from '@/components/NavBar';

export default async function NotFoundPage() {
  return (
    <div className="flex flex-1 flex-col">
      <NavBar />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="flex -translate-y-20 flex-col items-center gap-10">
          <ImageContent />
          <TextContent />
        </div>
      </main>
    </div>
  );
}
