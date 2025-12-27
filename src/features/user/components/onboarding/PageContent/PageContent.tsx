import PageIndicator from './PageIndicator';
import PageScreen from './PageScreen';

export default function PageContent() {
  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
      <PageIndicator />
      <PageScreen />
    </div>
  );
}
