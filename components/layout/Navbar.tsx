"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneIcon, ChevronDown, CloseIcon, ArrowRight } from "@/components/ui/Icons";
import { treks } from "@/data/treks";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/treks", label: "Treks", dropdown: true },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const regionGroups = [
  { region: "Everest", label: "Everest Region" },
  { region: "Annapurna", label: "Annapurna Region" },
  { region: "Langtang", label: "Langtang Region" },
  { region: "Manaslu", label: "Manaslu Region" },
  { region: "Restricted", label: "Restricted Areas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname]);

  const solid = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed top-0 z-[100] w-full transition-all duration-500 ${
        solid
          ? "bg-green-900/95 shadow-lg backdrop-blur-md"
          : "bg-gradient-to-b from-green-900/50 to-transparent"
      }`}
    >
      <nav className="container-trek flex items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link href="/" className="group" aria-label="Nepal Trek Agency home">
          <span className="flex items-center rounded-xl bg-white px-2.5 py-1 shadow-sm transition-opacity duration-300 group-hover:opacity-90">
            <img src="/logo.jpg" alt="Nepal Trek Agency" className="h-9 w-auto object-contain" />
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => link.dropdown && setDropdown(true)}
              onMouseLeave={() => link.dropdown && setDropdown(false)}
            >
              <Link
                href={link.href}
                className={`link-underline inline-flex items-center gap-1 font-montserrat text-sm font-medium text-snow/90 transition-colors hover:text-amber-300 ${
                  pathname === link.href ? "text-amber-300" : ""
                }`}
              >
                {link.label}
                {link.dropdown && <ChevronDown width={14} height={14} />}
              </Link>

              {link.dropdown && (
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4"
                    >
                      <div className="overflow-hidden rounded-2xl border border-amber-400/15 bg-green-900/98 p-2 shadow-trek-lg backdrop-blur-lg">
                        {regionGroups.map((g) => {
                          const count = treks.filter((t) => t.region === g.region).length;
                          return (
                            <Link
                              key={g.region}
                              href={`/treks?region=${g.region}`}
                              className="flex items-center justify-between rounded-xl px-4 py-2.5 font-montserrat text-sm text-snow/85 transition-colors hover:bg-green-800 hover:text-amber-300"
                            >
                              {g.label}
                              <span className="text-xs text-amber-400/70">{count}</span>
                            </Link>
                          );
                        })}
                        <Link
                          href="/treks"
                          className="mt-1 flex items-center gap-1.5 rounded-xl bg-amber-400/10 px-4 py-2.5 font-montserrat text-sm font-semibold text-amber-300"
                        >
                          View all treks <ArrowRight width={14} height={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <a
            href="tel:+9779866690671"
            className="inline-flex items-center gap-2 font-montserrat text-sm text-snow/80 transition-colors hover:text-amber-300"
          >
            <PhoneIcon width={16} height={16} className="text-amber-400" />
            +977-9866690671
          </a>
          <Link href="/contact" className="btn btn-amber px-5 py-2.5 text-xs">
            Plan Your Trek
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="h-0.5 w-6 bg-snow" />
          <span className="h-0.5 w-6 bg-snow" />
          <span className="h-0.5 w-4 self-end bg-amber-400" />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[110] flex flex-col bg-green-900 px-8 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-playfair text-xl font-bold text-snow">Menu</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-800 text-snow"
              >
                <CloseIcon width={22} height={22} />
              </button>
            </div>

            <ul className="mt-10 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-snow/10 py-4 font-playfair text-3xl text-snow transition-colors hover:text-amber-300"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto space-y-4">
              <a
                href="tel:+9779866690671"
                className="inline-flex items-center gap-2 font-montserrat text-sm text-snow/80"
              >
                <PhoneIcon width={16} height={16} className="text-amber-400" />
                +977-9866690671
              </a>
              <Link href="/contact" className="btn btn-amber w-full" onClick={() => setOpen(false)}>
                Plan Your Trek
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
