import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/bakery";
import { MENU_ITEMS } from "@/data/menu";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-25");

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/menu/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/custom-cakes/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const menuItemPages: MetadataRoute.Sitemap = MENU_ITEMS.map((item) => ({
    url: `${SITE_URL}/menu/${item.slug}/`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
    images: [`${SITE_URL}${item.image}`],
  }));

  return [...corePages, ...menuItemPages];
}
