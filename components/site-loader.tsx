interface SiteLoaderProps {
  label?: string;
  compact?: boolean;
}

export function SiteLoader({ label = "Učitavanje sadržaja", compact = false }: SiteLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`paper-grid flex items-center justify-center bg-[#fbfaf6] px-6 ${
        compact ? "min-h-[28rem]" : "min-h-[70svh]"
      }`}
    >
      <div className="w-full max-w-xs text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-[1.35rem] bg-[#071f32] text-white shadow-[0_20px_45px_-25px_rgb(7_31_50/70%)]">
          <span className="font-editorial text-2xl italic text-[#f5c64d]">DM</span>
        </div>
        <p className="mt-5 text-[0.67rem] font-black uppercase tracking-[0.2em] text-[#071f32]">
          {label}
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#071f32]/8">
          <div className="h-full w-1/2 origin-left animate-[loader-line_1.25s_cubic-bezier(0.65,0,0.35,1)_infinite] rounded-full bg-[#158bd2]" />
        </div>
        <span className="sr-only">Molimo sačekajte.</span>
      </div>
    </div>
  );
}
