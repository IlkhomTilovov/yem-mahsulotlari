import { createFileRoute } from "@tanstack/react-router";
import { Production } from "@/components/site";

export const Route = createFileRoute("/production")({
  head: () => ({
    meta: [
      { title: "Ishlab chiqarish — Steppe Nutrition" },
      { name: "description", content: "Zamonaviy Yevropa ekstruziya liniyalarida yiliga 12 000+ tonna quvvat." },
      { property: "og:title", content: "Zavod ichida — Steppe Nutrition" },
      { property: "og:description", content: "Shaffof, auditlanadigan ishlab chiqarish jarayoni." },
    ],
  }),
  component: Production,
});
