import Image from "next/image";

interface BrandSealProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: { box: "h-12 w-12", px: 48 },
  md: { box: "h-20 w-20", px: 80 },
  lg: { box: "h-36 w-36 sm:h-44 sm:w-44", px: 176 },
};

export function BrandSeal({ size = "sm", className = "" }: BrandSealProps) {
  const dims = SIZE_MAP[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-logo-tint ring-1 ring-ink-olive/25 shadow-sm ${dims.box} ${className}`}
    >
      <Image
        src="/images/mrida-logo.jpg"
        alt="Mrida Bakess — मृदा Bakess — Fresh, Flavourful, Organic 100% Pure Veg logo"
        width={dims.px}
        height={dims.px}
        className="h-full w-full object-cover mix-blend-multiply scale-[1.03]"
        priority={size === "sm"}
      />
    </div>
  );
}
