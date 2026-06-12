import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  TrustStrip,
  HomeStats,
  HomeBenefits,
  HomeVsMiddleman,
  HomeProductsPreview,
  HomePrivateLabel,
  HomeHowItWorks,
  HomeQualityScience,
  HomeSocialProof,
  HomeFinalCTA,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steppe Nutrition — O'zbekistondagi uy hayvonlari ozuqasi ishlab chiqaruvchisi va eksportchisi" },
      { name: "description", content: "O'zbekistondan ishonchli B2B uy hayvonlari ozuqasi yetkazib beruvchi hamkor. Mushuk va itlar uchun quruq va ho'l ozuqa. Private label, eksportga tayyor sertifikatlar, raqobatbardosh narxlar." },
      { property: "og:title", content: "Steppe Nutrition — Uy hayvonlari ozuqasi ishlab chiqaruvchi va eksportchi" },
      { property: "og:description", content: "Markaziy Osiyodan ishonchli uy hayvonlari ozuqasi yetkazib beruvchi hamkoringiz. Private label OEM, ISO sertifikatlangan, 20+ davlatga eksport." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HomeStats />
      <HomeBenefits />
      <HomeVsMiddleman />
      <HomeProductsPreview />
      <HomePrivateLabel />
      <HomeHowItWorks />
      <HomeQualityScience />
      <HomeSocialProof />
      <HomeFinalCTA />
    </>
  );
}
