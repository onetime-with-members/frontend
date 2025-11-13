import PopUpBadgeGroupContent from './PopUpBadgeGroupContent';
import PopUpHeader from './PopUpHeader';

export default function TimeBlockPopUp() {
  return (
    <div className="fixed left-0 top-[4.5rem] z-50 flex w-full justify-center px-4">
      <div
        className="w-full max-w-screen-sm overflow-hidden rounded-2xl bg-gray-00 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <PopUpHeader />
        <PopUpBadgeGroupContent />
      </div>
    </div>
  );
}
