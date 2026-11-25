"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { useOrderDrawer } from "@/context/OrderDrawerContext";
import { buildWhatsAppLink, formatOrderSummaryText } from "@/lib/format";
import { BAKERY_INFO } from "@/data/bakery";

export function ContactFormClient() {
  const searchParams = useSearchParams();
  const { items, clearOrder } = useOrderDrawer();

  const fromTray = searchParams.get("from") === "tray";
  const trayPrefill = fromTray && items.length > 0 ? formatOrderSummaryText(items) : "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryTypeOverride, setInquiryTypeOverride] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState("");
  const [messageOverride, setMessageOverride] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const inquiryType =
    inquiryTypeOverride ??
    (fromTray && items.length > 0
      ? "Bakery Menu / Order Tray Request"
      : "Birthday / Custom Cake Order");
  const message = messageOverride ?? trayPrefill;

  const setInquiryType = (val: string) => setInquiryTypeOverride(val);
  const setMessage = (val: string) => setMessageOverride(val);

  const composedWhatsApp = [
    `Hello Manu & Manisha (Mrida Bakess, Mandi)!`,
    `Name: ${name || "Guest"}`,
    `Phone: ${phone || "Not provided"}`,
    `Inquiry Type: ${inquiryType} (100% Pure Veg)`,
    eventDate ? `Preferred Date: ${eventDate}` : "",
    message ? `Details:\n${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (searchParams.get("from") === "tray") {
      clearOrder();
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-up rounded-3xl border border-herb/30 bg-logo-tint/85 p-6 text-center space-y-4 sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-herb text-white">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold text-ink">
          Thank you, {name || "Friend"}!
        </h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-olive">
          Your 100% Pure Veg order draft is ready! Tap WhatsApp below (
          <strong>{BAKERY_INFO.contact.whatsappRaw}</strong>) to send it directly to Manu &amp;
          Manisha, or call anytime between <strong>8:00 AM – 8:00 PM</strong> at{" "}
          <a href={BAKERY_INFO.contact.phoneHref} className="font-semibold text-herb underline">
            {BAKERY_INFO.contact.phoneRaw}
          </a>
          .
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={buildWhatsAppLink(composedWhatsApp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-herb px-6 py-3 text-sm font-semibold text-white transition hover:bg-herb-hover"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Send Directly on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-full border border-border-strong bg-surface px-5 py-3 text-xs font-semibold text-ink hover:bg-linen cursor-pointer"
          >
            Edit Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
          >
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Thakur"
            className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/70"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
          >
            Phone / WhatsApp Number *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98XXX XXXXX"
            className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/70"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-type"
            className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
          >
            What Can We Bake For You?
          </label>
          <select
            id="contact-type"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-4 py-2.5 text-sm text-ink"
          >
            <option>Birthday / Custom Cake Order</option>
            <option>Kids Theme / Princess Doll / Baby Shower Cake</option>
            <option>Wedding / Engagement Tiered Cake</option>
            <option>Bakery Menu / Order Tray Request</option>
            <option>Festive / Corporate Gift Hampers</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="contact-date"
            className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
          >
            Preferred Pickup / Event Date
          </label>
          <input
            id="contact-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border-strong bg-canvas px-4 py-2.5 text-sm text-ink"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold uppercase tracking-wider text-ink-olive"
        >
          Cake Flavor, Weight, Theme &amp; Message on Cake *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us your favorite 100% Pure Veg flavor (e.g. Belgian Truffle, Saffron Pistachio, Vanilla Berry), weight (500g / 1kg / 2kg), and any custom message or theme idea..."
          className="mt-1.5 w-full rounded-2xl border border-border-strong bg-canvas px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70"
        />
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-logo-tint transition hover:bg-herb hover:text-white cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span>Prepare Order Request</span>
        </button>

        <a
          href={buildWhatsAppLink(composedWhatsApp)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-strong bg-logo-tint px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-linen"
        >
          <MessageCircle className="h-4 w-4 text-herb" />
          <span>Chat on WhatsApp Directly</span>
        </a>
      </div>
    </form>
  );
}
