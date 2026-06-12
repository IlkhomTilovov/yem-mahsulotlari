import { createFileRoute } from "@tanstack/react-router";
import { Quality } from "@/components/site";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Sifat va sertifikatlar — Steppe Nutrition" },
      { name: "description", content: "ISO 22000, HACCP, GMP+, Halal, EAC va veterinariya sertifikatlari. To'liq kuzatuv va laboratoriya testlari." },
      { property: "og:title", content: "Sifat va sertifikatlar — Steppe Nutrition" },
      { property: "og:description", content: "Har bir partiya kuzatiladi, tekshiriladi va sertifikatlanadi." },
    ],
  }),
  component: Quality,
});
