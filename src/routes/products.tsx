import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/components/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Mahsulotlar — Steppe Nutrition" },
      { name: "description", content: "Mushuk va itlar uchun quruq va ho'l ozuqa, shirinliklar — 40+ SKU." },
      { property: "og:title", content: "Mahsulotlar katalogi — Steppe Nutrition" },
      { property: "og:description", content: "Beshta asosiy yo'nalish, 40+ SKU. Distribyutorlar va private-label hamkorlar uchun." },
    ],
  }),
  component: Products,
});
