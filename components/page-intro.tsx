import type { LucideIcon } from "lucide-react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: "blue" | "green" | "coral" | "yellow";
  aside?: React.ReactNode;
}

const tones = {
  blue: {
    pill: "bg-[#4ec5ee] text-[#071f32]",
    glow: "bg-[#158bd2]/25",
  },
  green: {
    pill: "bg-[#65d6a0] text-[#071f32]",
    glow: "bg-[#43a978]/24",
  },
  coral: {
    pill: "bg-[#ef513f] text-white",
    glow: "bg-[#ef513f]/22",
  },
  yellow: {
    pill: "bg-[#f5c64d] text-[#071f32]",
    glow: "bg-[#f5c64d]/18",
  },
};

export function PageIntro({
  eyebrow,
  title,
  description,
  icon: Icon,
  tone = "blue",
  aside,
}: PageIntroProps) {
  const colors = tones[tone];

  return (
    <section className="relative isolate overflow-hidden bg-[#071f32] text-white">
      <div className="ink-grid absolute inset-0 opacity-45" aria-hidden="true" />
      <div
        className={`absolute -right-24 -top-24 size-[30rem] rounded-full blur-3xl ${colors.glow}`}
        aria-hidden="true"
      />
      <div className="site-container relative grid min-h-80 items-end gap-10 pb-12 pt-14 sm:min-h-96 sm:pb-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.18em] ${colors.pill}`}
          >
            <Icon className="size-3.5" />
            {eyebrow}
          </div>
          <h1 className="text-balance mt-6 text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="text-pretty mt-5 max-w-2xl text-lg leading-8 text-white/66 sm:text-xl">
            {description}
          </p>
        </div>
        {aside ? <div className="lg:pb-1">{aside}</div> : null}
      </div>
    </section>
  );
}
