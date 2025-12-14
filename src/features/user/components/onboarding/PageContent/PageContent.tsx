import PageIndicator from './PageIndicator';
import PageScreen from './PageScreen';

export default function PageContent({
  name,
  registerToken,
  pageIndex,
  setPageIndex,
  moveToNextPage,
}: {
  name: string;
  registerToken: string;
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  moveToNextPage: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
      <PageIndicator pageIndex={pageIndex} />
      <PageScreen
        name={name}
        registerToken={registerToken}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        moveToNextPage={moveToNextPage}
      />
    </div>
  );
}
