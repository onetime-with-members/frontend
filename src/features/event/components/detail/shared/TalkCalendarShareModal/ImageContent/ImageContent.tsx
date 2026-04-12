import Image from 'next/image';

export default function ImageContent() {
  return (
    <div className="flex justify-center">
      <Image
        src="/images/calendar-notification-icon.svg"
        alt="Calendar with notification bell"
        width={98}
        height={104}
      />
    </div>
  );
}
