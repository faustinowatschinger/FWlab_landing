type ArrowDirection = "diagonal" | "left" | "right";

export function ArrowIcon({ direction = "diagonal", className }: { direction?: ArrowDirection; className?: string }) {
  const path = direction === "left"
    ? <path d="m12.5 4.5-7 7 7 7M6 11.5h12" />
    : direction === "right"
      ? <path d="m7.5 4.5 7 7-7 7M14 11.5H2" />
      : <><path d="M5 19 19 5" /><path d="M8 5h11v11" /></>;

  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>;
}
