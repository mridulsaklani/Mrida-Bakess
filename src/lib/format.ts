import { BAKERY_INFO } from "@/data/bakery";
import type { OrderLineItem } from "@/types/bakery";

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BAKERY_INFO.contact.whatsappNumber}?text=${encoded}`;
}

export function formatOrderSummaryText(
  items: OrderLineItem[],
  customerNote?: string
): string {
  if (items.length === 0) {
    return "Hi Mrida Bakess (Mandi)! I'd like to inquire about ordering fresh 100% Pure Veg cakes or pastries.";
  }

  const lines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.name} (${item.variantLabel}, 100% Pure Veg) × ${item.quantity} = ${formatInr(
        item.unitPriceInr * item.quantity
      )}${item.cakeNote ? ` [Note: ${item.cakeNote}]` : ""}`
  );

  const total = items.reduce((sum, item) => sum + item.unitPriceInr * item.quantity, 0);

  return [
    "Hello Manu & Manisha (Mrida Bakess, Bagla Mandi)!",
    "I would love to place a 100% Pure Veg order inquiry for:",
    "",
    ...lines,
    "",
    `Estimated Total: ${formatInr(total)}`,
    customerNote ? `Notes / Pickup Date: ${customerNote}` : "Please confirm availability & pickup slot.",
  ].join("\n");
}
