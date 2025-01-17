import calendarImage from '../../../../assets/landing/calendar.svg';

export default function TopGraphic() {
  return (
    <div className="relative flex h-[300px] flex-col items-center justify-center overflow-x-hidden">
      <div className="h-[200px] w-[230px]">
        <img
          src={calendarImage}
          alt="캘린더 아이콘"
          className="h-full w-full"
        />
      </div>
      <div
        className="absolute bottom-0 left-1/2 -z-10 h-[825px] w-[825px] -translate-x-1/2 rounded-full"
        style={{
          background: 'linear-gradient(180deg, #FFF 0%, #E8EBFF 100%)',
        }}
      />
    </div>
  );
}
