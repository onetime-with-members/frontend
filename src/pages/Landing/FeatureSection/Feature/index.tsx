interface FeatureProps {
  title: React.ReactNode;
  badgeTitle: React.ReactNode;
  description: React.ReactNode;
  image: React.ReactNode;
}

export default function Feature({
  title,
  badgeTitle,
  description,
  image,
}: FeatureProps) {
  return (
    <div className="mx-auto flex w-full max-w-[20rem] flex-col items-center py-10 md:max-w-max">
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl bg-primary-00 px-5 py-2 text-primary-40 text-md-300">
            {badgeTitle}
          </div>
          <h2 className="text-center text-[1.625rem] font-bold leading-[1.4] text-gray-80">
            {title}
          </h2>
          <p className="text-center text-gray-40 text-lg-200">{description}</p>
        </div>
        {image}
      </div>
    </div>
  );
}
