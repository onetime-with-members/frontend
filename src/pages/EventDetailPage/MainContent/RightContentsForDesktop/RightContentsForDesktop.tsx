import Participants from './Participants/Participants';

export default function RightContentsForDesktop() {
  return (
    <div className="hidden md:block">
      <Participants />
    </div>
  );
}
