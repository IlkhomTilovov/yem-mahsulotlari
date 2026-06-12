import { createFileRoute } from "@tanstack/react-router";
import { Export } from "@/components/site";

export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { title: "Eksport va logistika — Steppe Nutrition" },
      { name: "description", content: "Konteynerga tayyor, bojxonaga tayyor. 20+ davlatga eksport, barcha Incoterms qo'llab-quvvatlanadi." },
      { property: "og:title", content: "Eksport va logistika — Steppe Nutrition" },
      { property: "og:description", content: "FOB, CIF, DAP. Sizning logistikangizga moslashuvchan." },
    ],
  }),
  component: Export,
});
