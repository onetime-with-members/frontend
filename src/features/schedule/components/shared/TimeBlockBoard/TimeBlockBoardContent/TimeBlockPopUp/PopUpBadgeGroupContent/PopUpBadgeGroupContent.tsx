import MemberBadgeList from './MemberBadgeList';

export default function PopUpBadgeGroupContent() {
  return (
    <div className="flex flex-col gap-5 px-5 pb-6 pt-4">
      <MemberBadgeList type="possible" />
      <MemberBadgeList type="impossible" />
    </div>
  );
}
