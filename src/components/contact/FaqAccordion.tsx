"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/testimonials-faq";

export function FaqAccordion() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0]?.id ?? "");

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="overflow-hidden rounded-2xl border border-border-strong bg-surface transition-colors duration-200 hover:border-herb/50"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? "" : faq.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-logo-tint/40 transition-colors"
            >
              <div>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-herb">
                  {faq.category}
                </span>
                <span className="mt-0.5 block font-display text-base font-semibold text-ink sm:text-lg">
                  {faq.question}
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-ink-olive transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-herb" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border bg-canvas/50 px-5 py-4 text-sm leading-relaxed text-ink-olive">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
