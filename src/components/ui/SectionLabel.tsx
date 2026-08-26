type Props = {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
};

export function SectionLabel({ children, light, className = "" }: Props) {
  return (
    <span
      className={`section-label ${light ? "section-label-light" : ""} ${className}`}
    >
      {children}
    </span>
  );
}
