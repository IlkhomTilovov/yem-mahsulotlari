import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Kompaniya haqida — Steppe Nutrition" },
      { name: "description", content: "Steppe Nutrition — Toshkentda joylashgan vertikal integratsiyalangan uy hayvonlari ozuqasi ishlab chiqaruvchisi." },
      { property: "og:title", content: "Kompaniya haqida — Steppe Nutrition" },
      { property: "og:description", content: "Vertikal integratsiyalangan ishlab chiqarish — retseptdan eksportgacha." },
    ],
  }),
  component: About,
});
