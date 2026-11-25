"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

/**
 * Computes live bakery open/closed state in Asia/Kolkata (IST) for 8:00 AM - 8:00 PM daily.
 */
export function LiveBakeryStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    const checkIstStatus = () => {
      try {
        const istHourStr = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          hour12: false,
        }).format(new Date());
        const hour = Number.parseInt(istHourStr, 10);
        const isOpen = hour >= 8 && hour < 20;
        setStatus({
          open: isOpen,
          label: isOpen
            ? "Open Now · Fresh Counter Ready till 8 PM"
            : "Opens 8:00 AM Daily · WhatsApp Pre-Order Open",
        });
      } catch {
        setStatus({ open: true, label: "Open Daily · 8:00 AM – 8:00 PM" });
      }
    };

    checkIstStatus();
    const timer = window.setInterval(checkIstStatus, 60000);
    return () => window.clearInterval(timer);
  }, []);

  const label = status?.label ?? "Open Daily · 8:00 AM – 8:00 PM";
  const isOpen = status?.open ?? true;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/90 px-3 py-1 text-xs font-semibold text-ink shadow-xs">
      <span className="relative flex h-2.5 w-2.5">
        {isOpen ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-herb opacity-70" />
        ) : null}
        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isOpen ? "bg-herb" : "bg-terracotta"
          }`}
        />
      </span>
      <Clock className="h-3.5 w-3.5 text-herb" />
      <span>{label}</span>
    </span>
  );
}
