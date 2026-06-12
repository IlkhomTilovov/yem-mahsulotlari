import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  Globe2,
  Leaf,
  PackageCheck,
  FileDown,
  MessageCircle,
  Send,
  Mail,
  Menu,
  X,
  CheckCircle2,
  Truck,
  Award,
  FlaskConical,
  Building2,
  Sparkles,
  Quote,
} from "lucide-react";

import factoryHero from "@/assets/factory-hero.jpg";
import factoryLine from "@/assets/factory-line.jpg";
import privateLabelImg from "@/assets/private-label.jpg";
import dryDog from "@/assets/product-dry-dog.jpg";
import wetDog from "@/assets/product-wet-dog.jpg";
import dryCat from "@/assets/product-dry-cat.jpg";
import wetCat from "@/assets/product-wet-cat.jpg";
import treats from "@/assets/product-treats.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Steppe Nutrition — Pet Food Manufacturer & Exporter | Uzbekistan" },
      { name: "description", content: "Reliable B2B pet food supply partner from Central Asia. Dry & wet cat and dog food. Private label, export-ready certifications, competitive direct-from-manufacturer pricing." },
      { property: "og:title", content: "Steppe Nutrition — Pet Food Manufacturer & Exporter" },
      { property: "og:description", content: "Your reliable pet food supply partner from Central Asia. Private label OEM, ISO-certified, exporting to 20+ countries." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Steppe Nutrition",
        description: "Pet food manufacturer and exporter based in Uzbekistan. Dry and wet food for cats and dogs. Private label OEM partner for international distributors.",
        address: { "@type": "PostalAddress", addressCountry: "UZ", addressLocality: "Tashkent" },
      }),
    }],
  }),
  component: Landing,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Private Label", href: "#private-label" },
  { label: "Quality", href: "#quality" },
  { label: "Production", href: "#production" },
  { label: "Export", href: "#export" },
  { label: "Contact", href: "#contact" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Products />
        <PrivateLabel />
        <Quality />
        <Production />
        <Export />
        <SocialProof />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<"EN" | "RU" | "UZ">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors ${
        scrolled ? "border-border bg-background/85 backdrop-blur" : "border-transparent bg-background"
      }`}
    >
      <div className="container-x flex h-16 items-center gap-4 md:h-20">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Steppe<span className="text-primary"> Nutrition</span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div className="hidden items-center rounded-full border border-border bg-card p-0.5 md:flex">
            {(["EN", "RU", "UZ"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a href="#contact" className="hidden btn-warm md:inline-flex">
            Request a Quote <ArrowRight className="h-4 w-4" />
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-border lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="container-x flex h-16 items-center">
            <span className="font-display text-lg font-extrabold">Steppe Nutrition</span>
            <button
              className="ml-auto grid h-10 w-10 place-items-center rounded-lg border border-border"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-x mt-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
              >
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-warm mt-4">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-gradient-to-b from-secondary via-background to-background"
      />
      <div className="container-x grid gap-12 pt-12 pb-20 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-24 lg:pb-28">
        <div className="fade-up flex flex-col justify-center">
          <span className="eyebrow"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> B2B Manufacturer · Exporter</span>
          <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
            Your reliable pet food supply partner from
            <span className="text-primary"> Central Asia</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We manufacture export-ready dry and wet food for cats and dogs — certified
            quality, consistent supply, and private-label flexibility that protects
            your margin.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-warm">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#products" className="btn-outline">
              <FileDown className="h-4 w-4" /> Download Catalog
            </a>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground sm:grid-cols-3">
            {[
              "ISO 22000 certified",
              "MOQ from 5 tons",
              "FOB & CIF supported",
              "Private-label OEM",
              "Veterinary approved",
              "24h reply guarantee",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
            <img
              src={factoryHero}
              alt="Pet food production line at the Steppe Nutrition factory in Uzbekistan"
              width={1600}
              height={1100}
              className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
            />
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-background/90 p-3 text-center backdrop-blur md:inset-x-6 md:bottom-6 md:p-4">
              {[
                { k: "20+", v: "Export countries" },
                { k: "12k t", v: "Annual capacity" },
                { k: "ISO", v: "22000 certified" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-xl font-extrabold text-primary md:text-2xl">{s.k}</div>
                  <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground md:text-xs">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-warm/40 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust strip ---------------- */
function TrustStrip() {
  const items = [
    "ISO 22000", "HACCP", "Halal Certified", "EAC", "Veterinary Approved", "GMP+",
  ];
  return (
    <section aria-label="Certifications" className="border-y border-border bg-surface/60">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {items.map((i) => (
          <span key={i} className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" /> {i}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const stats = [
    { k: "12,000+", v: "Tons / year capacity", icon: Factory },
    { k: "20+", v: "Export countries", icon: Globe2 },
    { k: "12", v: "Years in operation", icon: Building2 },
    { k: "40+", v: "SKUs across categories", icon: PackageCheck },
  ];
  return (
    <Section id="about" eyebrow="About the company" title="Manufacturer and exporter — under one roof.">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Steppe Nutrition is a vertically integrated pet food manufacturer based in
          Tashkent, Uzbekistan. We control everything from recipe development and
          extrusion to packaging and international shipping — so our B2B partners
          get a single, accountable source for consistent quality and predictable
          lead times.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {stats.map(({ k, v, icon: Icon }) => (
            <div key={v} className="card-surface p-5 sm:p-6">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                {k}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Products ---------------- */
const PRODUCTS = [
  { name: "Premium Dry Dog Food", category: "Dog · Dry", img: dryDog, protein: "26%", sizes: "1, 3, 10, 20 kg", shelf: "18 months" },
  { name: "Wet Dog Food in Gravy", category: "Dog · Wet", img: wetDog, protein: "10%", sizes: "100, 200, 400 g", shelf: "24 months" },
  { name: "Adult Dry Cat Food", category: "Cat · Dry", img: dryCat, protein: "32%", sizes: "0.4, 1.5, 5, 10 kg", shelf: "18 months" },
  { name: "Wet Cat Food Pâté", category: "Cat · Wet", img: wetCat, protein: "11%", sizes: "85, 100, 200 g", shelf: "24 months" },
  { name: "Natural Meat Treats", category: "Snacks", img: treats, protein: "55%", sizes: "50, 100, 250 g", shelf: "12 months" },
  { name: "Puppy & Kitten Range", category: "Dog · Cat · Dry", img: dryDog, protein: "30%", sizes: "0.5, 1.5, 5 kg", shelf: "18 months" },
];

function Products() {
  const cats = ["All", "Dog", "Cat", "Snacks"];
  const [filter, setFilter] = useState("All");
  const visible = PRODUCTS.filter((p) => filter === "All" || p.category.includes(filter));

  return (
    <Section
      id="products"
      eyebrow="Product catalog"
      title="Built for distributors, importers and private-label partners."
      subtitle="Five core lines, 40+ SKUs. All recipes formulated by certified veterinary nutritionists, manufactured to your spec or ours."
    >
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
        <a href="#contact" className="ml-auto hidden text-sm font-semibold text-primary hover:underline sm:inline-flex">
          Download full catalog (PDF) →
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <article key={p.name} className="card-surface overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden bg-surface">
              <img
                src={p.img}
                alt={p.name}
                width={900}
                height={675}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
              />
            </div>
            <div className="p-5 sm:p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                {p.category}
              </div>
              <h3 className="mt-2 text-lg font-bold tracking-tight">{p.name}</h3>
              <dl className="mt-4 grid grid-cols-3 gap-3 border-y border-border py-4 text-xs">
                <Spec label="Protein" value={p.protein} />
                <Spec label="Packaging" value={p.sizes} />
                <Spec label="Shelf life" value={p.shelf} />
              </dl>
              <div className="mt-4 flex gap-2">
                <a href="#contact" className="btn-primary flex-1 !py-2.5 !text-sm">
                  Request Quote
                </a>
                <a href="#contact" className="btn-outline flex-1 !py-2.5 !text-sm">
                  Request Sample
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 truncate font-semibold text-foreground">{value}</dd>
    </div>
  );
}

/* ---------------- Private Label ---------------- */
function PrivateLabel() {
  const steps = [
    { n: "01", t: "Recipe", d: "Use one of our proven formulas or co-develop your own with our nutritionists." },
    { n: "02", t: "Packaging", d: "Your brand, your design — bags, cans, pouches. Full artwork support included." },
    { n: "03", t: "Production", d: "Manufactured on dedicated runs with full QC traceability and lab testing." },
    { n: "04", t: "Export", d: "FOB, CIF, DAP. Containers loaded with all documentation, ready for clearance." },
  ];
  return (
    <section id="private-label" className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-28">
        <div>
          <div className="overflow-hidden rounded-3xl border border-white/15">
            <img
              src={privateLabelImg}
              alt="Private label pet food packaging mockup"
              width={1400}
              height={1000}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-warm">
            <Sparkles className="h-4 w-4" /> Private label manufacturing
          </span>
          <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.25rem]">
            Your brand,<br />our production.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            Most of our partners sell our product under their own brand. We're built
            for it: dedicated production runs, your packaging, your recipe — and
            margins that direct-from-factory pricing makes possible.
          </p>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {steps.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur transition-colors hover:bg-white/[0.1]"
              >
                <div className="font-display text-2xl font-extrabold text-warm">{s.n}</div>
                <div className="mt-2 font-semibold">{s.t}</div>
                <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">{s.d}</p>
              </li>
            ))}
          </ol>

          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-warm px-6 py-3.5 text-sm font-bold text-warm-foreground transition-transform hover:-translate-y-0.5"
          >
            Start a Private Label Project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Quality ---------------- */
function Quality() {
  const certs = [
    { t: "ISO 22000", d: "Food safety management" },
    { t: "HACCP", d: "Hazard analysis system" },
    { t: "GMP+", d: "Good manufacturing practice" },
    { t: "Halal", d: "Certified production line" },
    { t: "EAC", d: "Eurasian conformity" },
    { t: "Vet. Cert.", d: "State veterinary approval" },
  ];
  return (
    <Section
      id="quality"
      eyebrow="Quality & certifications"
      title="A trust center for buyers who can't compromise."
      subtitle="Every batch traceable. Every shipment tested. Every certificate available on request."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {certs.map((c) => (
            <div key={c.t} className="card-surface flex flex-col items-start gap-2 p-5">
              <Award className="h-6 w-6 text-primary" />
              <div className="mt-2 font-display text-lg font-bold">{c.t}</div>
              <div className="text-xs text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>

        <ul className="space-y-5">
          {[
            { i: FlaskConical, t: "In-house lab testing", d: "Every batch tested for protein, fat, moisture, ash and microbiological safety before release." },
            { i: PackageCheck, t: "Full traceability", d: "Lot codes linked from raw material to finished pallet — auditable on demand." },
            { i: ShieldCheck, t: "Export documentation ready", d: "Health certificates, certificates of origin, lab reports and customs paperwork delivered with every container." },
          ].map(({ i: Icon, t, d }) => (
            <li key={t} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="font-display text-lg font-bold">{t}</div>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------------- Production ---------------- */
function Production() {
  const steps = ["Raw material intake", "Recipe formulation", "Extrusion & drying", "Coating & cooling", "Lab QC release", "Packaging & palletizing"];
  return (
    <section id="production" className="bg-surface/60 py-20 lg:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Inside the factory</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">Made in Uzbekistan, built for the world.</h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">
            12,000+ tons of annual capacity across modern European extrusion lines.
            Transparent, auditable production — you're welcome to visit any time.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-card)]">
          <img
            src={factoryLine}
            alt="Modern pet food extrusion production line"
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s} className="card-surface flex items-center gap-4 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="font-semibold">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Export ---------------- */
function Export() {
  const countries = ["Kazakhstan", "Kyrgyzstan", "Turkmenistan", "Tajikistan", "Russia", "Belarus", "Georgia", "Azerbaijan", "Armenia", "Turkey", "UAE", "Saudi Arabia", "Iraq", "Mongolia", "Vietnam", "China"];
  return (
    <Section
      id="export"
      eyebrow="Export & logistics"
      title="Container-ready, customs-ready, partner-ready."
      subtitle="We handle the export side so your import side runs smoothly."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { i: Truck, t: "Incoterms supported", d: "EXW, FOB, CFR, CIF, DAP. Flexible to your logistics setup." },
            { i: PackageCheck, t: "Export packaging", d: "Multi-layer, moisture-resistant, optimized for 40' HC containers." },
            { i: ShieldCheck, t: "Customs documents", d: "Phytosanitary, health, origin & lab certificates included." },
            { i: Globe2, t: "Worldwide delivery", d: "Sea, road and rail freight via Tashkent and partner ports." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="card-surface p-5">
              <Icon className="h-5 w-5 text-primary" />
              <div className="mt-4 font-display text-base font-bold">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>

        <div className="card-surface p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Currently exporting to
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold">20+ countries across Eurasia and beyond</h3>
          <ul className="mt-6 flex flex-wrap gap-2">
            {countries.map((c) => (
              <li
                key={c}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Social Proof ---------------- */
function SocialProof() {
  const logos = ["PetCo Asia", "Nordic Paws", "MENA Vet", "PrimePet", "Aralia Trade", "Kalmar Foods"];
  return (
    <section className="border-y border-border bg-card py-16 lg:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Trusted by international partners</span>
          <h2 className="mt-4 text-3xl sm:text-4xl">Distributors building their brands with us.</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-6 opacity-70 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((l) => (
            <div key={l} className="text-center font-display text-lg font-bold tracking-tight text-muted-foreground">
              {l}
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {[
            { q: "Consistent quality batch after batch, and the private-label flexibility let us launch our own brand in 8 months.", a: "Distributor, Kazakhstan" },
            { q: "Documentation arrived perfect with the first container. Customs cleared without a single delay.", a: "Importer, UAE" },
          ].map((t) => (
            <figure key={t.a} className="card-surface p-6 sm:p-8">
              <Quote className="h-6 w-6 text-warm" />
              <blockquote className="mt-4 text-lg leading-relaxed">{t.q}</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-muted-foreground">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact / RFQ ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow="Request a quote" title="Start an inquiry. We reply within 24 hours.">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="card-surface p-6 sm:p-8"
        >
          {sent ? (
            <div className="flex flex-col items-start gap-3 py-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <h3 className="font-display text-2xl font-bold">Inquiry received.</h3>
              <p className="text-muted-foreground">
                Our export team will reply within 24 hours with pricing, MOQ and sample
                options.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Company" name="company" required />
              <Field label="Country" name="country" required />
              <Field label="Email" name="email" type="email" required />
              <div className="sm:col-span-2">
                <Field label="What are you looking for?" name="message" textarea placeholder="Product, target volume, packaging, destination port…" />
              </div>
              <button type="submit" className="btn-warm sm:col-span-2 !py-3.5">
                Send Inquiry <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                By submitting, you agree to be contacted by our export team. No spam, ever.
              </p>
            </div>
          )}
        </form>

        <div className="space-y-4">
          <ContactRow
            icon={MessageCircle}
            title="WhatsApp"
            value="+998 90 000 00 00"
            href="https://wa.me/998900000000"
            cta="Chat on WhatsApp"
          />
          <ContactRow
            icon={Send}
            title="Telegram"
            value="@steppe_nutrition"
            href="https://t.me/steppe_nutrition"
            cta="Message on Telegram"
          />
          <ContactRow
            icon={Mail}
            title="Email"
            value="export@steppenutrition.uz"
            href="mailto:export@steppenutrition.uz"
            cta="Send email"
          />
          <div className="card-surface p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Headquarters</div>
            <p className="mt-2 font-display text-lg font-bold">Tashkent, Uzbekistan</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Mon–Sat · 09:00–18:00 (UTC+5) · English, Russian, Uzbek
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label, name, type = "text", required, textarea, placeholder,
}: { label: string; name: string; type?: string; required?: boolean; textarea?: boolean; placeholder?: string }) {
  const cls =
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}{required && " *"}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} placeholder={placeholder} className={cls} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}

function ContactRow({ icon: Icon, title, value, href, cta }: { icon: typeof MessageCircle; title: string; value: string; href: string; cta: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="card-surface flex items-center gap-4 p-5"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
        <div className="truncate font-semibold">{value}</div>
      </div>
      <span className="hidden text-sm font-semibold text-primary sm:inline">{cta} →</span>
    </a>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60 pb-24 pt-14 lg:pb-14">
      <div className="container-x grid gap-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">Steppe Nutrition</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Pet food manufacturer and exporter from Tashkent, Uzbekistan.
            Manufacturing partner to distributors and private-label brands worldwide.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <FooterCol title="Company" links={["About", "Production", "Quality", "Export"]} />
          <FooterCol title="Products" links={["Dry Dog Food", "Wet Dog Food", "Dry Cat Food", "Wet Cat Food", "Treats"]} />
          <FooterCol title="Partners" links={["Private Label", "Distributors", "Catalog"]} />
          <FooterCol title="Contact" links={["Request Quote", "WhatsApp", "Telegram", "Email"]} />
        </div>
      </div>
      <div className="container-x mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Steppe Nutrition LLC · Made in Uzbekistan</span>
        <span>EN · RU · UZ</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#contact" className="hover:text-foreground">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Sticky mobile CTA ---------------- */
function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <a href="#contact" className="btn-warm w-full !py-3.5">
        Request a Quote <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ---------------- Generic Section ---------------- */
function Section({
  id, eyebrow, title, subtitle, children,
}: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          {subtitle && <p className="mt-5 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
        </div>
        <div className="mt-12 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}
