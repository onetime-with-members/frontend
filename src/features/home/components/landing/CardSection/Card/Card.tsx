export default function Card({
  title,
  badgeTitle,
  description,
  image,
  style,
  backgroundPattern,
}: {
  title: React.ReactNode;
  badgeTitle: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
  style?: React.CSSProperties;
  backgroundPattern?: React.ReactNode;
}) {
  return (
    <div
      className="relative mx-auto flex w-full max-w-[25rem] flex-col items-start overflow-hidden rounded-2xl bg-primary-40 px-6 pt-10 text-gray-00 md:mx-0 md:max-w-full"
      style={style}
    >
      <div className="z-10 flex w-full flex-col gap-10">
        <div className="flex flex-col items-start gap-6">
          <div className="rounded-full bg-gray-00 px-5 py-2 text-primary-50 text-md-300">
            {badgeTitle}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[1.625rem] font-bold leading-[1.4]">{title}</h2>
            <p className="text-primary-10 text-lg-200">{description}</p>
          </div>
        </div>

        {image}
      </div>

      {backgroundPattern}
    </div>
  );
}
