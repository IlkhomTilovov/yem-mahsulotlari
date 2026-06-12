import { createFileRoute } from "@tanstack/react-router";
import { PrivateLabel } from "@/components/site";

export const Route = createFileRoute("/private-label")({
  head: () => ({
    meta: [
      { title: "Private Label ishlab chiqarish — Steppe Nutrition" },
      { name: "description", content: "Sizning brendingiz, bizning ishlab chiqarishimiz. To'liq OEM private-label hamkorligi." },
      { property: "og:title", content: "Private Label OEM — Steppe Nutrition" },
      { property: "og:description", content: "Retsept, qadoqlash, ishlab chiqarish, eksport — bir tom ostida." },
    ],
  }),
  component: PrivateLabel,
});
