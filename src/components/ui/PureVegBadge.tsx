interface PureVegBadgeProps {
  label?: string;
  compact?: boolean;
  iconOnly?: boolean;
  displayClass?: string;
  className?: string;
}

/**
 * FSSAI-style green Pure Veg square-dot emblem + optional label.
 * Uses explicit `displayClass` so callers passing `hidden sm:inline-flex`
 * never collide with a hardcoded `inline-flex` rule in Tailwind CSS v4.
 */
export function PureVegBadge({
  label = "100% Pure Veg",
  compact = false,
  iconOnly = false,
  displayClass = "inline-flex",
  className = "",
}: PureVegBadgeProps) {
  return (
    <span
      title={label}
      aria-label={iconOnly ? label : undefined}
      className={`${displayClass} items-center justify-center rounded-full border border-herb/35 bg-surface/95 font-semibold text-herb shadow-xs ${
        iconOnly ? "p-1.5" : compact ? "gap-1.5 px-2.5 py-1 text-[11px]" : "gap-1.5 px-3 py-1 text-xs"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-herb bg-white"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-herb" />
      </span>
      {!iconOnly ? <span>{label}</span> : null}
    </span>
  );
}
