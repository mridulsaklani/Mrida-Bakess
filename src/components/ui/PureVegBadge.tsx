interface PureVegBadgeProps {
  label?: string;
  compact?: boolean;
  className?: string;
}

export function PureVegBadge({
  label = "100% Pure Veg",
  compact = false,
  className = "",
}: PureVegBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-herb/30 bg-surface/95 font-semibold text-herb shadow-xs ${
        compact ? "px-2.5 py-1 text-[11px]" : "px-3 py-1 text-xs"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-herb bg-white"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-herb" />
      </span>
      <span>{label}</span>
    </span>
  );
}
