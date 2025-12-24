export default function MyEventListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col gap-5 px-4 py-5">{children}</div>;
}
