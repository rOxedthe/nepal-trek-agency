"use client";

import { useMemo } from "react";

export type BgVariant =
  | "mountains"
  | "snow"
  | "flags"
  | "contours"
  | "footprints"
  | "compass"
  | "pines"
  | "clouds"
  | "eagles"
  | "poles";

interface Props {
  variant: BgVariant;
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Decorative, low-opacity trekking motifs that animate behind content.
 * Always pointer-events-none, absolutely positioned, z-0.
 */
export default function AnimatedBackground({
  variant,
  className = "",
  tone = "dark",
}: Props) {
  const stroke = tone === "dark" ? "#0D2F6B" : "#f8f6f4";
  const accent = "#F5821F";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {variant === "mountains" && <Mountains stroke={stroke} accent={accent} />}
      {variant === "snow" && <Snow tone={tone} />}
      {variant === "flags" && <Flags />}
      {variant === "contours" && <Contours stroke={stroke} />}
      {variant === "footprints" && <Footprints stroke={stroke} />}
      {variant === "compass" && <Compass stroke={stroke} accent={accent} />}
      {variant === "pines" && <Pines stroke={stroke} />}
      {variant === "clouds" && <Clouds tone={tone} />}
      {variant === "eagles" && <Eagles stroke={stroke} />}
      {variant === "poles" && <Poles stroke={stroke} />}
    </div>
  );
}

function Mountains({ stroke, accent }: { stroke: string; accent: string }) {
  return (
    <svg
      className="absolute bottom-0 left-0 h-full w-full"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
    >
      <g className="animate-parallax-x" style={{ opacity: 0.06 }}>
        <path d="M-50 400 L200 140 L380 400Z" fill={stroke} />
        <path d="M250 400 L520 90 L760 400Z" fill={stroke} />
        <path d="M650 400 L900 160 L1250 400Z" fill={stroke} />
      </g>
      <g style={{ opacity: 0.09 }}>
        <path d="M-50 400 L150 220 L420 400Z" fill={stroke} />
        <path d="M350 400 L640 180 L980 400Z" fill={stroke} />
        <path d="M520 165 L560 200 L600 175" stroke={accent} strokeWidth={3} opacity={0.5} />
      </g>
    </svg>
  );
}

function Snow({ tone }: { tone: "light" | "dark" }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        dur: 9 + Math.random() * 12,
        delay: -Math.random() * 18,
        drift: Math.random() > 0.5,
      })),
    [],
  );
  const color = "#AACCFF";
  return (
    <>
      {flakes.map((f, i) => (
        <span
          key={i}
          className="animate-drift-down absolute top-0 rounded-full"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            background: color,
            opacity: tone === "dark" ? 0.1 : 0.5,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function Flags() {
  const colors = ["#F5821F", "#1A4FA8", "#2D8A27", "#7B4A1E", "#0D2F6B"];
  const flags = Array.from({ length: 14 });
  return (
    <svg className="absolute left-0 top-6 w-full" viewBox="0 0 1200 90" preserveAspectRatio="none">
      <path d="M0 18 Q600 64 1200 18" stroke="#3D2222" strokeWidth={1.4} fill="none" opacity={0.3} />
      {flags.map((_, i) => {
        const x = 40 + i * 82;
        const y = 22 + Math.sin(i) * 10;
        return (
          <polygon
            key={i}
            points={`${x},${y} ${x + 34},${y + 2} ${x + 17},${y + 34}`}
            fill={colors[i % colors.length]}
            opacity={0.16}
            className="animate-sway"
            style={{ transformOrigin: `${x + 17}px ${y}px`, animationDelay: `${i * 0.2}s` }}
          />
        );
      })}
    </svg>
  );
}

function Contours({ stroke }: { stroke: string }) {
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 600">
      <g fill="none" stroke={stroke} strokeWidth={1.2} style={{ opacity: 0.07 }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <ellipse
            key={i}
            cx="300"
            cy="300"
            rx={60 + i * 48}
            ry={42 + i * 36}
            className="animate-pulse-ring"
            style={{ transformOrigin: "300px 300px", animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

function Footprints({ stroke }: { stroke: string }) {
  const prints = Array.from({ length: 12 });
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
      {prints.map((_, i) => {
        const x = 60 + i * 95;
        const y = 230 - Math.sin(i * 0.7) * 90;
        return (
          <g
            key={i}
            style={{
              opacity: 0,
              animation: `drift-down 0s`,
              animationName: "none",
            }}
          >
            <ellipse
              cx={x}
              cy={y}
              rx={7}
              ry={12}
              fill={stroke}
              style={{
                opacity: 0.1,
                transform: `rotate(${i % 2 ? 12 : -12}deg)`,
                transformOrigin: `${x}px ${y}px`,
                animation: "float-slow 5s ease-in-out infinite",
                animationDelay: `${i * 0.4}s`,
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

function Compass({ stroke, accent }: { stroke: string; accent: string }) {
  return (
    <svg className="absolute -right-10 -top-10 h-64 w-64 animate-spin-slow" viewBox="0 0 200 200" style={{ opacity: 0.08 }}>
      <circle cx="100" cy="100" r="92" fill="none" stroke={stroke} strokeWidth={2} />
      <circle cx="100" cy="100" r="70" fill="none" stroke={stroke} strokeWidth={1} />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const r1 = i % 4 === 0 ? 60 : 78;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={100 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * 90}
            y2={100 + Math.sin(a) * 90}
            stroke={stroke}
            strokeWidth={i % 4 === 0 ? 2 : 1}
          />
        );
      })}
      <polygon points="100,30 110,100 100,90 90,100" fill={accent} />
      <polygon points="100,170 110,100 100,110 90,100" fill={stroke} />
    </svg>
  );
}

function Pines({ stroke }: { stroke: string }) {
  const trees = Array.from({ length: 18 });
  return (
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
      {trees.map((_, i) => {
        const x = i * 70 + (i % 2 ? 18 : 0);
        const h = 60 + (i % 3) * 22;
        return (
          <g
            key={i}
            className="animate-sway"
            style={{ transformOrigin: `${x}px 120px`, animationDelay: `${(i % 5) * 0.3}s`, opacity: 0.08 }}
          >
            <polygon points={`${x},${120 - h} ${x - 16},120 ${x + 16},120`} fill={stroke} />
            <polygon points={`${x},${120 - h + 18} ${x - 22},${120 - 6} ${x + 22},${120 - 6}`} fill={stroke} />
          </g>
        );
      })}
    </svg>
  );
}

function Clouds({ tone }: { tone: "light" | "dark" }) {
  const fill = tone === "dark" ? "#0D2F6B" : "#ffffff";
  const clouds = [
    { top: "8%", dur: 60, delay: 0, scale: 1 },
    { top: "22%", dur: 90, delay: -20, scale: 0.7 },
    { top: "14%", dur: 75, delay: -45, scale: 1.3 },
  ];
  return (
    <>
      {clouds.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 200 60"
          className="absolute"
          style={{
            top: c.top,
            left: "-20%",
            width: 200 * c.scale,
            opacity: tone === "dark" ? 0.05 : 0.4,
            fill,
            animation: `soar ${c.dur}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <path d="M40 50a20 20 0 0 1 4-39 26 26 0 0 1 49-4 18 18 0 0 1 24 17 16 16 0 0 1-3 26H40Z" />
        </svg>
      ))}
    </>
  );
}

function Eagles({ stroke }: { stroke: string }) {
  const birds = [
    { top: "18%", dur: 30, delay: 0, s: 1 },
    { top: "30%", dur: 42, delay: -12, s: 0.7 },
    { top: "12%", dur: 36, delay: -24, s: 0.5 },
  ];
  return (
    <>
      {birds.map((b, i) => (
        <svg
          key={i}
          viewBox="0 0 60 24"
          className="absolute"
          style={{
            top: b.top,
            width: 60 * b.s,
            opacity: 0.13,
            stroke,
            fill: "none",
            strokeWidth: 2,
            animation: `soar ${b.dur}s linear infinite`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <path d="M2 14 Q16 2 30 12 Q44 2 58 14" strokeLinecap="round" />
        </svg>
      ))}
    </>
  );
}

function Poles({ stroke }: { stroke: string }) {
  return (
    <svg className="absolute bottom-0 right-10 h-72" viewBox="0 0 80 220" style={{ opacity: 0.08 }}>
      <g className="animate-sway" style={{ transformOrigin: "40px 220px" }}>
        <line x1="28" y1="10" x2="20" y2="218" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
        <line x1="52" y1="14" x2="60" y2="218" stroke={stroke} strokeWidth={3} strokeLinecap="round" />
        <circle cx="20" cy="214" r="5" fill="none" stroke={stroke} strokeWidth={2} />
        <circle cx="60" cy="214" r="5" fill="none" stroke={stroke} strokeWidth={2} />
        <line x1="24" y1="20" x2="32" y2="20" stroke={stroke} strokeWidth={4} strokeLinecap="round" />
        <line x1="48" y1="24" x2="56" y2="24" stroke={stroke} strokeWidth={4} strokeLinecap="round" />
      </g>
    </svg>
  );
}
