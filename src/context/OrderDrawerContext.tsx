"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import type { OrderLineItem } from "@/types/bakery";

interface OrderDrawerContextValue {
  items: OrderLineItem[];
  isOpen: boolean;
  toastMessage: string | null;
  totalItems: number;
  totalEstimate: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<OrderLineItem, "quantity">, quantity?: number) => void;
  updateQuantity: (
    itemId: string,
    variantLabel: string,
    eggless: boolean,
    delta: number,
    cakeNote?: string
  ) => void;
  removeItem: (itemId: string, variantLabel: string, eggless: boolean, cakeNote?: string) => void;
  clearOrder: () => void;
  dismissToast: () => void;
}

const STORAGE_KEY = "mrida-bakers-order-tray-v1";
const STORE_EVENT = "mrida-order-tray-change";
const EMPTY_ITEMS: OrderLineItem[] = [];

let cachedRaw: string | null = null;
let cachedParsed: OrderLineItem[] = EMPTY_ITEMS;

function readStoredItems(): OrderLineItem[] {
  if (typeof window === "undefined") return EMPTY_ITEMS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedParsed;
    cachedRaw = raw;
    if (!raw) {
      cachedParsed = EMPTY_ITEMS;
      return cachedParsed;
    }
    const parsed = JSON.parse(raw) as OrderLineItem[];
    cachedParsed = Array.isArray(parsed) ? parsed : EMPTY_ITEMS;
    return cachedParsed;
  } catch {
    return EMPTY_ITEMS;
  }
}

function writeStoredItems(next: OrderLineItem[]) {
  if (typeof window === "undefined") return;
  try {
    const serialized = JSON.stringify(next);
    cachedRaw = serialized;
    cachedParsed = next;
    window.localStorage.setItem(STORAGE_KEY, serialized);
    window.dispatchEvent(new Event(STORE_EVENT));
  } catch {
    // Ignore storage quota errors in restricted browsing modes
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(STORE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(STORE_EVENT, callback);
  };
}

function getServerSnapshot(): OrderLineItem[] {
  return EMPTY_ITEMS;
}

const OrderDrawerContext = createContext<OrderDrawerContextValue | null>(null);

export function OrderDrawerProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, readStoredItems, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const dismissToast = useCallback(() => setToastMessage(null), []);

  const addItem = useCallback(
    (incoming: Omit<OrderLineItem, "quantity">, quantity = 1) => {
      const prev = readStoredItems();
      const idx = prev.findIndex(
        (entry) =>
          entry.itemId === incoming.itemId &&
          entry.variantLabel === incoming.variantLabel &&
          entry.eggless === incoming.eggless &&
          (entry.cakeNote ?? "") === (incoming.cakeNote ?? "")
      );

      let updated: OrderLineItem[];
      if (idx >= 0) {
        updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + quantity,
        };
      } else {
        updated = [...prev, { ...incoming, quantity }];
      }

      writeStoredItems(updated);
      setToastMessage(`Added ${incoming.name} (${incoming.variantLabel}) to your Order List`);
    },
    []
  );

  const updateQuantity = useCallback(
    (itemId: string, variantLabel: string, eggless: boolean, delta: number, cakeNote?: string) => {
      const prev = readStoredItems();
      const updated = prev
        .map((entry) => {
          if (
            entry.itemId === itemId &&
            entry.variantLabel === variantLabel &&
            entry.eggless === eggless &&
            (entry.cakeNote ?? "") === (cakeNote ?? "")
          ) {
            return { ...entry, quantity: entry.quantity + delta };
          }
          return entry;
        })
        .filter((entry) => entry.quantity > 0);
      writeStoredItems(updated);
    },
    []
  );

  const removeItem = useCallback(
    (itemId: string, variantLabel: string, eggless: boolean, cakeNote?: string) => {
      const prev = readStoredItems();
      const updated = prev.filter(
        (entry) =>
          !(
            entry.itemId === itemId &&
            entry.variantLabel === variantLabel &&
            entry.eggless === eggless &&
            (entry.cakeNote ?? "") === (cakeNote ?? "")
          )
      );
      writeStoredItems(updated);
    },
    []
  );

  const clearOrder = useCallback(() => {
    writeStoredItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimate = items.reduce(
    (sum, item) => sum + item.unitPriceInr * item.quantity,
    0
  );

  return (
    <OrderDrawerContext.Provider
      value={{
        items,
        isOpen,
        toastMessage,
        totalItems,
        totalEstimate,
        openDrawer,
        closeDrawer,
        addItem,
        updateQuantity,
        removeItem,
        clearOrder,
        dismissToast,
      }}
    >
      {children}
    </OrderDrawerContext.Provider>
  );
}

export function useOrderDrawer(): OrderDrawerContextValue {
  const ctx = useContext(OrderDrawerContext);
  if (!ctx) {
    throw new Error("useOrderDrawer must be used inside OrderDrawerProvider");
  }
  return ctx;
}
