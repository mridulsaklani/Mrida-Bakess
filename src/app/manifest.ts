import type { MetadataRoute } from "next";
import { BAKERY_INFO } from "@/data/bakery";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BAKERY_INFO.brandName} — ${BAKERY_INFO.tagline}`,
    short_name: BAKERY_INFO.brandName,
    description: BAKERY_INFO.heroSubtitle,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFBF4",
    theme_color: "#F4FADE",
    icons: [
      {
        src: "/images/mrida-logo.jpg",
        sizes: "958x958",
        type: "image/jpeg",
      },
    ],
  };
}
