/* ------------------------------------------------------------------ */
/*  Frame de iPhone premium para presentar las capturas de FW Control.  */
/* ------------------------------------------------------------------ */

export function FrostIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15" />
      <path d="M12 5l-2 2M12 5l2 2M12 19l-2-2M12 19l2-2M5 12l2-2M5 12l2 2M19 12l-2-2M19 12l-2 2" />
    </svg>
  );
}

export function PhoneFrame({
  children,
  className = "",
  showIsland = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Mostrar dynamic island. Las capturas reales ya traen su notch → false. */
  showIsland?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative rounded-[2.6rem] bg-[#0b0f14] p-[7px] shadow-[0_30px_70px_-15px_rgba(15,23,42,0.55)] ring-1 ring-white/10">
        {/* side buttons */}
        <span className="absolute -left-[2px] top-24 h-9 w-[2px] rounded-l bg-[#0b0f14]" />
        <span className="absolute -left-[2px] top-36 h-14 w-[2px] rounded-l bg-[#0b0f14]" />
        <span className="absolute -right-[2px] top-32 h-16 w-[2px] rounded-r bg-[#0b0f14]" />
        <div className="relative aspect-[9/19.3] w-full overflow-hidden rounded-[2.1rem] bg-slate-100">
          {showIsland && (
            <div className="absolute left-1/2 top-2 z-20 h-5 w-[34%] -translate-x-1/2 rounded-full bg-black" />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
