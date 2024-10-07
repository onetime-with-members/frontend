interface TypoWrapperProps {
  children: React.ReactNode;
}

export default function TypoWrapper({ children }: TypoWrapperProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}
