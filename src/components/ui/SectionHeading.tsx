import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actionLabel?: string;
  actionHref?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actionLabel,
  actionHref,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col gap-4 ${
        isCentered
          ? "items-center text-center mx-auto max-w-2xl"
          : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={isCentered ? "space-y-3" : "space-y-3 max-w-2xl"}>
        <div
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-herb ${
            isCentered ? "justify-center" : ""
          }`}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-terracotta" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
          {title}
        </h2>
        {description ? (
          <p className="text-base leading-relaxed text-ink-muted sm:text-[1.05rem]">
            {description}
          </p>
        ) : null}
      </div>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-herb hover:bg-logo-tint md:self-auto"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4 text-herb transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
}
