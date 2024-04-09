interface TypographyPProps {
  children: React.ReactNode;
}

export function TypographyP({ children }: TypographyPProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6"><span>{children}</span></p>;
}

interface TypographyH1Props {
  children: React.ReactNode;
}

export function TypographyH1({ children }: TypographyH1Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      <span>{children}</span>
    </h1>
  );
}

interface TypographyH2Props {
  children: React.ReactNode;
}

export function TypographyH2({ children }: TypographyH2Props) {
  return (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
      <span>{children}</span>
    </h2>
  );
}

interface TypographyH3Props {
  children: React.ReactNode;
}

export function TypographyH3({ children }: TypographyH3Props) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      <span>{children}</span>
    </h3>
  );
}

interface TypographyH4Props {
  children: React.ReactNode;
}

export function TypographyH4({ children }: TypographyH4Props) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      <span>{children}</span>
    </h4>
  );
}

interface TypographyLargeProps {
  children: React.ReactNode;
}

export function TypographyLarge({ children }: TypographyLargeProps) {
  return (
    <div className="text-lg font-semibold">
      <span>{children}</span>
    </div>
  );
}

interface TypographySmallProps {
  children: React.ReactNode;
}

export function TypographySmall({ children }: TypographySmallProps) {
  return (
    <small className="text-sm font-medium leading-none">
      <span>{children}</span>
    </small>
  );
}

interface TypographyMutedProps {
  children: React.ReactNode;
}

export function TypographyMuted({ children }: TypographyMutedProps) {
  return (
    <p className="text-sm text-muted-foreground">
      <span>{children}</span>
    </p>
  );
}
