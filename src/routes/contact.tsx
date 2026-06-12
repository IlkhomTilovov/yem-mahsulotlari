import { createFileRoute } from "@tanstack/react-router";
import { Contact, SocialProof } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Aloqa va narx so'rovi — Steppe Nutrition" },
      { name: "description", content: "So'rovni boshlang. Biz 24 soat ichida narx, MOQ va namuna variantlari bilan javob beramiz." },
      { property: "og:title", content: "Aloqa — Steppe Nutrition" },
      { property: "og:description", content: "WhatsApp, Telegram, Email — 24 soat ichida javob." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <Contact />
      <SocialProof />
    </>
  );
}
