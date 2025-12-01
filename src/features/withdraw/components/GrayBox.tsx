export function GrayBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-gray-05 p-6">
      <h2 className="text-gray-60 text-lg-300">{title}</h2>
      <p className="text-gray-40 text-md-200">{description}</p>
    </div>
  );
}
