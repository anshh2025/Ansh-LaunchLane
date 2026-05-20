export const GrayTitle = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/90">{children}</span>
);

export const BlueTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`bg-linear-to-br font-serif from-emerald-300 via-teal-400 to-emerald-600 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </span>
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-[0.14em] uppercase mb-4">
    <span className="w-4 h-px bg-emerald-400" />
    {children}
    <span className="w-4 h-px bg-emerald-400" />
  </p>
);

export const SectionHeading = ({
  gray,
  blue,
}: {
  gray: string;
  blue: string;
}) => (
  <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight">
    <GrayTitle>{gray}</GrayTitle>
    <br />
    <BlueTitle>{blue}</BlueTitle>
  </h2>
);
