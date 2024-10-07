import ClockPatternLine from './ClockPatternLine';

export default function ClockPattern() {
  return (
    <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-7">
      {Array.from({ length: 10 }).map((_, index) => (
        <ClockPatternLine key={index} shift={index % 2 === 0} />
      ))}
    </div>
  );
}
