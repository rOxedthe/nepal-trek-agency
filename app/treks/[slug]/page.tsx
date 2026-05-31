import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { treks, getTrek, difficultyColor } from "@/data/treks";
import ItineraryAccordion from "@/components/treks/ItineraryAccordion";
import ElevationChart from "@/components/treks/ElevationChart";
import StickyBookingBar from "@/components/treks/StickyBookingBar";
import TrekCard from "@/components/ui/TrekCard";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import Reveal from "@/components/ui/Reveal";
import {
  CheckIcon,
  CloseIcon,
  ClockIcon,
  AltitudeIcon,
  PinIcon,
  ArrowRight,
} from "@/components/ui/Icons";

export function generateStaticParams() {
  return treks.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const trek = getTrek(params.slug);
  if (!trek) return { title: "Trek not found" };
  return {
    title: trek.name,
    description: trek.blurb,
    openGraph: { images: [trek.image] },
  };
}

const statusColor: Record<string, string> = {
  Available: "text-green-600",
  Limited: "text-amber-600",
  Full: "text-stone-500",
};

export default function TrekDetailPage({ params }: { params: { slug: string } }) {
  const trek = getTrek(params.slug);
  if (!trek) notFound();

  const related = treks
    .filter((t) => t.slug !== trek.slug && t.region === trek.region)
    .slice(0, 3);
  const fill = related.length < 3 ? treks.filter((t) => t.slug !== trek.slug && t.region !== trek.region).slice(0, 3 - related.length) : [];
  const relatedTreks = [...related, ...fill];

  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[68vh] min-h-[460px] w-full items-end overflow-hidden">
        <Image src={trek.image} alt={trek.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/50 to-green-900/30" />
        <AnimatedBackground variant="snow" tone="light" />
        <div className="container-trek relative z-10 px-6 pb-12 pt-28 md:px-12">
          <nav className="mb-4 flex flex-wrap items-center gap-2 font-montserrat text-xs text-snow/70">
            <Link href="/" className="hover:text-amber-300">Home</Link>
            <span className="text-snow/40">/</span>
            <Link href="/treks" className="hover:text-amber-300">Treks</Link>
            <span className="text-snow/40">/</span>
            <span className="text-amber-300">{trek.name}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-snow/95 px-3 py-1 font-montserrat text-[11px] font-semibold uppercase tracking-wider text-green-800">
              {trek.region}
            </span>
            <span className={`rounded-full px-3 py-1 font-montserrat text-[11px] font-semibold ${difficultyColor[trek.difficulty]}`}>
              {trek.difficulty}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-playfair text-4xl font-bold leading-tight text-snow text-balance md:text-6xl">
            {trek.name}
          </h1>
          <p className="mt-4 max-w-2xl font-lato text-lg text-snow/80">{trek.blurb}</p>
        </div>
      </section>

      {/* Body */}
      <section className="relative overflow-hidden bg-warm section-pad">
        <AnimatedBackground variant="contours" tone="dark" />
        <div className="container-trek relative z-10 grid gap-12 lg:grid-cols-3">
          {/* Main */}
          <div className="space-y-14 lg:col-span-2">
            {/* quick facts */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { Icon: ClockIcon, label: "Duration", val: `${trek.days} days` },
                { Icon: AltitudeIcon, label: "Max altitude", val: `${trek.maxAltitude.toLocaleString()} m` },
                { Icon: PinIcon, label: "Region", val: trek.region },
                { Icon: CheckIcon, label: "Best season", val: trek.bestSeason },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl border border-stone-200 bg-snow p-4 text-center">
                  <f.Icon width={22} height={22} className="mx-auto text-amber-500" />
                  <p className="mt-2 font-montserrat text-[10px] uppercase tracking-widest text-stone-500">{f.label}</p>
                  <p className="mt-1 font-dm text-sm text-green-900">{f.val}</p>
                </div>
              ))}
            </div>

            <Reveal>
              <h2 className="font-playfair text-3xl font-bold text-green-900">Overview</h2>
              <p className="mt-4 font-lato text-base leading-relaxed text-stone-800">{trek.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {trek.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 font-lato text-sm text-stone-800">
                    <span className="mt-1 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-amber-400 text-green-900">
                      <CheckIcon width={11} height={11} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-green-900">Elevation Profile</h2>
              <div className="mt-5 rounded-2xl border border-stone-200 bg-snow p-5">
                <ElevationChart itinerary={trek.itinerary} />
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-green-900">Day-by-Day Itinerary</h2>
              <div className="mt-5">
                <ItineraryAccordion itinerary={trek.itinerary} />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-green-700/20 bg-green-700/5 p-6">
                <h3 className="font-playfair text-xl font-bold text-green-800">What&apos;s Included</h3>
                <ul className="mt-4 space-y-2.5">
                  {trek.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2 font-lato text-sm text-stone-800">
                      <CheckIcon width={16} height={16} className="mt-0.5 flex-none text-green-600" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-earth-700/20 bg-earth-700/5 p-6">
                <h3 className="font-playfair text-xl font-bold text-earth-700">Not Included</h3>
                <ul className="mt-4 space-y-2.5">
                  {trek.excludes.map((x) => (
                    <li key={x} className="flex items-start gap-2 font-lato text-sm text-stone-800">
                      <CloseIcon width={16} height={16} className="mt-0.5 flex-none text-earth-400" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-3xl font-bold text-green-900">Departure Dates</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200">
                <table className="w-full text-left">
                  <thead className="bg-green-700 font-montserrat text-xs uppercase tracking-wider text-snow">
                    <tr>
                      <th className="px-5 py-3">Start date</th>
                      <th className="px-5 py-3">Availability</th>
                      <th className="px-5 py-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-snow font-lato text-sm">
                    {trek.departures.map((d) => (
                      <tr key={d.date}>
                        <td className="px-5 py-3 text-green-900">{d.date}</td>
                        <td className={`px-5 py-3 font-semibold ${statusColor[d.status]}`}>{d.status}</td>
                        <td className="px-5 py-3 text-right font-bold text-green-900">${trek.price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* gallery */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-green-900">Trek Gallery</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {trek.gallery.map((src, i) => (
                  <div key={i} className="relative h-40 overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`${trek.name} scenery ${i + 1}`}
                      fill
                      sizes="(max-width:768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-3xl border border-stone-200 bg-green-900 p-7 text-snow shadow-trek">
              <p className="font-montserrat text-xs uppercase tracking-widest text-snow/60">From</p>
              <p className="font-playfair text-5xl font-bold text-amber-400">
                ${trek.price.toLocaleString()}
              </p>
              <p className="mt-1 font-montserrat text-xs text-snow/60">per person · all-inclusive on trail</p>

              <div className="mt-6 space-y-3 border-y border-snow/10 py-5 font-lato text-sm">
                <Row label="Duration" value={`${trek.days} days`} />
                <Row label="Difficulty" value={trek.difficulty} />
                <Row label="Max altitude" value={`${trek.maxAltitude.toLocaleString()} m`} />
                <Row label="Group size" value="Max 12 trekkers" />
                <Row label="Best season" value={trek.bestSeason} />
              </div>

              <Link href="/contact" className="btn btn-amber mt-6 w-full">
                Book This Trek
              </Link>
              <a href="https://wa.me/9779866690671" target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-3 w-full">
                Ask a Question
              </a>
              <p className="mt-4 text-center font-montserrat text-[11px] text-snow/50">
                Free cancellation up to 30 days before departure
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="relative overflow-hidden bg-stone-100 section-pad">
        <AnimatedBackground variant="pines" tone="dark" />
        <div className="container-trek relative z-10">
          <h2 className="text-center font-playfair text-4xl font-bold text-green-900">You Might Also Like</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedTreks.map((t, i) => (
              <TrekCard key={t.slug} trek={t} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/treks" className="btn btn-green group">
              Browse All Treks <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <StickyBookingBar name={trek.name} price={trek.price} />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-snow/60">{label}</span>
      <span className="text-right font-semibold text-snow">{value}</span>
    </div>
  );
}
