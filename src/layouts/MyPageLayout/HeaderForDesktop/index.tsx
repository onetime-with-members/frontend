interface HeaderForDesktopProps {
  pageTitle: string | undefined;
}

export default function HeaderForDesktop({ pageTitle }: HeaderForDesktopProps) {
  return (
    <div className="sticky top-[64px] z-20 flex items-center justify-between bg-gray-00 py-2">
      <h1 className="text-[1.75rem] font-semibold">{pageTitle}</h1>
    </div>
  );
}
