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
    <div className="mx-auto flex w-full max-w-[20rem] flex-col items-start py-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-4">
          <div className="rounded-full bg-gray-80 px-5 py-2 text-gray-00 text-md-300">
            {badgeTitle}
          </div>
          <h2 className="text-[1.625rem] font-bold leading-[1.4] text-gray-80">
            {title}
          </h2>
          <p className="text-gray-40 text-lg-200">{description}</p>
        </div>
        {image}
      </div>
    </div>
  );
}
