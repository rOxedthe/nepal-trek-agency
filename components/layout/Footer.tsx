import Link from "next/link";
import {
  PeakIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
  TripAdvisorIcon,
  PinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
} from "@/components/ui/Icons";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const socials = [
  { Icon: FacebookIcon, label: "Facebook" },
  { Icon: InstagramIcon, label: "Instagram" },
  { Icon: XIcon, label: "X (Twitter)" },
  { Icon: YoutubeIcon, label: "YouTube" },
  { Icon: TripAdvisorIcon, label: "TripAdvisor" },
];

const popularTreks = [
  "Everest Base Camp Trek",
  "Annapurna Circuit Trek",
  "Ghorepani Poon Hill Trek",
  "Langtang Valley Trek",
  "Upper Mustang Trek",
  "Manaslu Circuit Trek",
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Why Trek With Us", href: "/about" },
  { label: "Our Guides", href: "/about" },
  { label: "Sustainability", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-900 text-snow">
      <AnimatedBackground variant="flags" tone="light" />
      <div className="container-trek relative z-10 px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-green-900">
                <PeakIcon width={24} height={24} strokeWidth={1.8} />
              </span>
              <span className="leading-none">
                <span className="block font-playfair text-lg font-bold">Nepal Trek</span>
                <span className="block font-montserrat text-[10px] uppercase tracking-[0.3em] text-amber-300">
                  Agency
                </span>
              </span>
            </Link>
            <p className="mt-5 font-dm text-base text-amber-300">
              Expert Himalayan trekking since 2010
            </p>
            <p className="mt-3 font-lato text-sm leading-relaxed text-snow/70">
              Kathmandu-based, locally owned and guided. We turn Himalayan dreams
              into safe, unforgettable journeys.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700 text-snow transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-400 hover:text-green-900"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Popular treks */}
          <div>
            <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest text-amber-300">
              Popular Treks
            </h3>
            <ul className="mt-5 space-y-3">
              {popularTreks.map((t) => (
                <li key={t}>
                  <a
                    href="#"
                    className="font-lato text-sm text-snow/70 transition-colors hover:text-amber-300"
                  >
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest text-amber-300">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="font-lato text-sm text-snow/70 transition-colors hover:text-amber-300"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & trust */}
          <div>
            <h3 className="font-montserrat text-sm font-semibold uppercase tracking-widest text-amber-300">
              Get In Touch
            </h3>
            <ul className="mt-5 space-y-4 font-lato text-sm text-snow/70">
              <li className="flex gap-3">
                <PinIcon width={18} height={18} className="mt-0.5 flex-none text-amber-400" />
                <span>GPO Box 24725, Mahankal-6, Boudha, Kathmandu, Nepal</span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon width={18} height={18} className="flex-none text-amber-400" />
                <a href="tel:+9779866690671" className="hover:text-amber-300">+977-9866690671</a>
              </li>
              <li className="flex gap-3">
                <MailIcon width={18} height={18} className="flex-none text-amber-400" />
                <a href="mailto:info@nepaltrekagency.com" className="hover:text-amber-300">
                  info@nepaltrekagency.com
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon width={18} height={18} className="flex-none text-amber-400" />
                <span>Mon–Sat · 9am–6pm (UTC+5:45)</span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md border border-amber-400/30 px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                TAAN Member
              </span>
              <span className="rounded-md border border-amber-400/30 px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                Nepal Tourism Board
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-snow/10 bg-green-900">
        <div className="container-trek flex flex-col items-center justify-between gap-3 px-6 py-6 text-center md:flex-row md:px-12 md:text-left">
          <p className="font-montserrat text-xs text-snow/60">
            © 2024 Nepal Trek Agency Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 font-montserrat text-xs text-snow/60">
            <a href="#" className="hover:text-amber-300">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-amber-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
