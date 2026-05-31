"use client";

import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  align?: "center" | "left";
}) {
  const titleColor = tone === "dark" ? "text-green-900" : "text-snow";
  const subColor = tone === "dark" ? "text-stone-500" : "text-snow/70";
  return (
    <div
      className={`relative z-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-4 text-amber-600">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal i={1}>
        <h2 className={`font-playfair text-4xl font-bold leading-tight text-balance md:text-5xl ${titleColor}`}>
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal i={2}>
          <p className={`mt-5 text-lg leading-relaxed text-pretty ${subColor}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
