interface TypoWrapperProps {
  children: React.ReactNode;
}

export default function TypoWrapper({ children }: TypoWrapperProps) {
  return <div className="flex justify-between">{children}</div>;
}
