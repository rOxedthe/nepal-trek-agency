import Image from "next/image";
import Link from "next/link";
import AnimatedBackground, { type BgVariant } from "./AnimatedBackground";
import type { ReactNode } from "react";

interface Crumb {
  label: string;
  href?: string;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  variant = "mountains",
  crumbs,
  children,
  height = "h-[52vh]",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  variant?: BgVariant;
  crumbs?: Crumb[];
  children?: ReactNode;
  height?: string;
}) {
  return (
    <section className={`relative flex ${height} min-h-[360px] w-full items-end overflow-hidden`}>
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/55 to-green-900/40" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-900" />
      )}
      <AnimatedBackground variant={variant} tone="light" />

      <div className="container-trek relative z-10 px-6 pb-12 pt-28 md:px-12">
        {crumbs && (
          <nav className="mb-4 flex flex-wrap items-center gap-2 font-montserrat text-xs text-snow/70">
            {crumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-amber-300">{c.label}</Link>
                ) : (
                  <span className="text-amber-300">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="text-snow/40">/</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow text-amber-300">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-playfair text-4xl font-bold leading-tight text-snow text-balance md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl font-lato text-lg text-snow/80">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
