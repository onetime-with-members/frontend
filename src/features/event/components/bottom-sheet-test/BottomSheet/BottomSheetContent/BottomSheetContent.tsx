export default function BottomSheetContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 overflow-y-auto bg-white p-6">{children}</div>;
}
