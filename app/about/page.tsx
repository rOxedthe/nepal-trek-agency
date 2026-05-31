import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import TeamCard, { type Guide } from "@/components/about/TeamCard";
import { ShieldIcon, LeafIcon, PeakIcon, GuideIcon, ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Nepal Trek Agency — born in the Himalayas, run by local expert guides since 2010. Meet our team and our commitment to safe, sustainable trekking.",
};

const timeline = [
  { year: "2010", text: "Founded in Boudha, Kathmandu by a small team of Sherpa and Gurung guides." },
  { year: "2013", text: "Became a registered TAAN member and licensed by the Nepal Tourism Board." },
  { year: "2016", text: "Expanded into restricted regions — Upper Mustang, Manaslu and Tsum Valley." },
  { year: "2020", text: "Launched our Leave No Trace programme and porter welfare charter." },
  { year: "2024", text: "Crossed 1,000 successful expeditions with a 98% satisfaction rate." },
];

const guides: Guide[] = [
  {
    name: "Bhupendra Tamang",
    role: "Lead Guide · Everest Expert",
    speciality: "Everest Base Camp, Gokyo",
    years: 15,
    languages: "Nepali, English, Hindi",
    bio: "Bhupendra has summited Kala Patthar over 40 times and leads our highest-altitude expeditions with calm authority.",
    image: "https://images.unsplash.com/photo-1539701938214-0d9736e1c16b?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Dip Sherpa",
    role: "Annapurna Specialist",
    speciality: "Annapurna Circuit & Base Camp",
    years: 12,
    languages: "Nepali, English, French",
    bio: "Raised in the Annapurna foothills, Dip knows every teahouse and hidden viewpoint along the circuit.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Sagar Gurung",
    role: "Cultural Trek Expert",
    speciality: "Langtang, Tsum Valley",
    years: 10,
    languages: "Nepali, English, German",
    bio: "Sagar weaves the history and spirituality of each valley into every trek, making the culture come alive.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Sunita Rai",
    role: "Logistics Manager",
    speciality: "Permits & Operations",
    years: 8,
    languages: "Nepali, English",
    bio: "Sunita orchestrates permits, transport and teahouse bookings so every trekker can simply show up and walk.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80&auto=format&fit=crop",
  },
];

const certs = [
  { Icon: PeakIcon, label: "TAAN Member" },
  { Icon: ShieldIcon, label: "Nepal Tourism Board Licensed" },
  { Icon: LeafIcon, label: "Leave No Trace Certified" },
  { Icon: GuideIcon, label: "Govt. of Nepal Registered" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Since 2010"
        title="Born in the Himalayas, Built for Adventure"
        subtitle="A locally owned agency run by the guides who grew up beneath these peaks."
        image="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1600&q=80&auto=format&fit=crop"
        variant="mountains"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Our Story */}
      <section className="relative overflow-hidden bg-warm section-pad">
        <AnimatedBackground variant="contours" tone="dark" />
        <div className="container-trek relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative h-[420px] overflow-hidden rounded-3xl shadow-trek">
            <Image
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1000&q=80&auto=format&fit=crop"
              alt="Our guides on a Himalayan trail"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <p className="eyebrow text-amber-600">Our Story</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold text-green-900">
              A team of locals with a shared love of the mountains
            </h2>
            <p className="mt-5 font-lato leading-relaxed text-stone-800">
              Nepal Trek Agency began in 2010 in the narrow lanes of Boudha, Kathmandu, founded by
              a handful of guides who had spent their lives on these trails. We were tired of seeing
              visitors handed cookie-cutter itineraries by faceless operators — so we built something
              different.
            </p>
            <p className="mt-4 font-lato leading-relaxed text-stone-800">
              Every trek we run is led by a guide born and raised in the Himalayas. We keep groups
              small, we look after our porters, and we treat the mountains with the respect they
              deserve. Fifteen years and a thousand expeditions later, that hasn&apos;t changed.
            </p>
            <Link href="/contact" className="btn btn-amber group mt-8">
              Plan With Us <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative overflow-hidden bg-green-900 section-pad text-snow">
        <AnimatedBackground variant="mountains" tone="light" />
        <div className="container-trek relative z-10">
          <SectionHeading eyebrow="Our Journey" title="Milestones on the Trail" tone="light" />
          <div className="mt-14 grid gap-6 md:grid-cols-5">
            {timeline.map((m, i) => (
              <Reveal key={m.year} i={i} className="relative rounded-2xl border border-snow/10 bg-green-800/50 p-6">
                <p className="font-playfair text-3xl font-bold text-amber-400">{m.year}</p>
                <p className="mt-3 font-lato text-sm leading-relaxed text-snow/80">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-warm section-pad">
        <AnimatedBackground variant="pines" tone="dark" />
        <div className="container-trek relative z-10">
          <SectionHeading
            eyebrow="The People"
            title="Meet Your Guides"
            subtitle="Hover or tap a card to read each guide's story."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guides.map((g, i) => (
              <TeamCard key={g.name} guide={g} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative overflow-hidden bg-stone-100 py-16">
        <div className="container-trek relative z-10 px-6 md:px-12">
          <p className="mb-8 text-center font-montserrat text-xs uppercase tracking-[0.3em] text-stone-500">
            Accredited &amp; Trusted
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {certs.map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-3 rounded-2xl border border-stone-200 bg-snow p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-amber-300">
                  <c.Icon width={26} height={26} />
                </span>
                <span className="font-montserrat text-xs font-semibold text-green-900">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
