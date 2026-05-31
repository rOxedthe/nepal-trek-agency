"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import { treks } from "@/data/treks";
import { CloseIcon, ArrowRight, ClockIcon, AltitudeIcon } from "@/components/ui/Icons";
import Link from "next/link";

/* ─── Data ──────────────────────────────────────────────────── */
const TREK_PINS = [
  { slug: "everest-base-camp",   label: "Everest BC",       lat: 27.9881, lon: 86.9250, alt: 5364 },
  { slug: "gokyo-lake",          label: "Gokyo Ri",         lat: 27.9653, lon: 86.6800, alt: 5357 },
  { slug: "annapurna-base-camp", label: "Annapurna BC",     lat: 28.5312, lon: 83.8773, alt: 4130 },
  { slug: "annapurna-circuit",   label: "Thorong La",       lat: 28.7942, lon: 83.9306, alt: 5416 },
  { slug: "ghorepani-poon-hill", label: "Poon Hill",        lat: 28.4008, lon: 83.7077, alt: 3210 },
  { slug: "mardi-himal",         label: "Mardi Himal",      lat: 28.4985, lon: 83.8741, alt: 4500 },
  { slug: "langtang-valley",     label: "Kyanjin Gompa",    lat: 28.2119, lon: 85.5659, alt: 3870 },
  { slug: "gosaikunda",          label: "Gosaikunda",       lat: 28.0897, lon: 85.4157, alt: 4380 },
  { slug: "manaslu-circuit",     label: "Larkya La",        lat: 28.6542, lon: 84.7631, alt: 5106 },
  { slug: "tsum-valley",         label: "Mu Gompa",         lat: 28.8736, lon: 84.7853, alt: 3700 },
  { slug: "upper-mustang",       label: "Lo Manthang",      lat: 29.1811, lon: 83.9574, alt: 3840 },
  { slug: "kanchenjunga",        label: "Kangchenjunga BC", lat: 27.7025, lon: 88.1475, alt: 5143 },
];

const REGION_MARKERS = [
  { name: "Everest",   lat: 27.98, lon: 86.92 },
  { name: "Annapurna", lat: 28.60, lon: 83.82 },
  { name: "Langtang",  lat: 28.21, lon: 85.60 },
  { name: "Manaslu",   lat: 28.55, lon: 84.56 },
];

/* ─── Globe constants ───────────────────────────────────────── */
const R = 2;
const FAR_Z = 6;
const FAR_FOV = 45;
const CLOSE_Z = 2.5;   // 0.5 units from surface — Nepal fills most of viewport
const CLOSE_FOV = 20;
// Centered on lon 85.9°E (midpoint of all trek pins, Poon Hill↔Kangchenjunga)
const NEPAL_ROT_Y = 3.213;

function toVec(lat: number, lon: number, r = R) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/* ─── Camera: smooth distance clamp + FOV (telephoto = flat look) */
function CameraRig({
  zoomRef,
  controlsRef,
}: {
  zoomRef: React.MutableRefObject<number>;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera } = useThree();
  const smoothDist = useRef(FAR_Z);

  // Priority -1 → runs BEFORE OrbitControls (priority 0)
  // so the clamped distance is ready when OrbitControls calls update()
  useFrame(() => {
    const targetDist = FAR_Z + (CLOSE_Z - FAR_Z) * zoomRef.current;
    smoothDist.current += (targetDist - smoothDist.current) * 0.07;

    // Pin the orbit radius + slow rotation when close so pins stay catchable
    if (controlsRef.current) {
      controlsRef.current.minDistance = smoothDist.current;
      controlsRef.current.maxDistance = smoothDist.current;
      controlsRef.current.rotateSpeed = THREE.MathUtils.lerp(1.0, 0.07, zoomRef.current);
    }

    const cam = camera as THREE.PerspectiveCamera;
    if (cam.fov !== undefined) {
      const targetFOV = FAR_FOV + (CLOSE_FOV - FAR_FOV) * zoomRef.current;
      cam.fov += (targetFOV - cam.fov) * 0.07;
      cam.updateProjectionMatrix();
    }
  }, -1);

  return null;
}

/* ─── Globe mesh + markers ──────────────────────────────────── */
function GlobeMesh({
  zoomRef,
  isZoomed,
  onRegionSelect,
  onTrekSelect,
  onHover,
}: {
  zoomRef: React.MutableRefObject<number>;
  isZoomed: boolean;
  onRegionSelect: (name: string) => void;
  onTrekSelect: (slug: string) => void;
  onHover: (pin: (typeof TREK_PINS)[0] | null) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const rotY = useRef(0);
  const pinGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Globe rotation
    if (zoomRef.current < 0.05) {
      rotY.current += delta * 0.12;
    } else {
      const diff =
        ((NEPAL_ROT_Y - rotY.current) % (2 * Math.PI) + 3 * Math.PI) %
          (2 * Math.PI) - Math.PI;
      rotY.current += diff * 0.05;
    }
    group.current.rotation.y = rotY.current;

    // Dynamic pin scale: keeps ~5 px screen radius at every zoom level.
    // At t=0 (z=6, FOV=45): natural size. At t=1 (z=2.5, FOV=20): ~26× smaller.
    const t = zoomRef.current;
    const s = THREE.MathUtils.lerp(1, 0.026, t);
    pinGroupRefs.current.forEach((g, i) => {
      if (!g) return;
      g.scale.setScalar(s * (hovered === TREK_PINS[i]?.slug ? 2.2 : 1));
    });
  });

  const pinR    = 0.07;  // base radius — scaled per-frame above
  const pinRHov = 0.07;

  return (
    <group ref={group}>
      {/* Sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshStandardMaterial
          color={isZoomed ? "#2a5218" : "#1f3d1f"}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Grid — denser when zoomed in for map feel */}
      <mesh>
        <sphereGeometry args={[R + 0.006, isZoomed ? 48 : 24, isZoomed ? 32 : 16]} />
        <meshBasicMaterial
          color={isZoomed ? "#4aaa3a" : "#3a7a3a"}
          wireframe
          transparent
          opacity={isZoomed ? 0.28 : 0.22}
        />
      </mesh>

      {/* Snow cap when zoomed */}
      {isZoomed && (
        <mesh>
          <sphereGeometry args={[R + 0.003, 32, 16]} />
          <meshBasicMaterial color="#e0f0f8" transparent opacity={0.07} />
        </mesh>
      )}

      {/* Nepal amber glow (only far view) */}
      {!isZoomed && (
        <mesh position={toVec(28.2, 84.5, R + 0.02)}>
          <sphereGeometry args={[0.32, 24, 24]} />
          <meshBasicMaterial color="#f5b245" transparent opacity={0.28} />
        </mesh>
      )}

      {/* Region markers — zoomed out only */}
      {!isZoomed &&
        REGION_MARKERS.map((m) => {
          const active = hovered === m.name;
          return (
            <group key={m.name} position={toVec(m.lat, m.lon, R + 0.05)}>
              <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(m.name); document.body.style.cursor = "pointer"; }}
                onPointerOut={() => { setHovered(null); document.body.style.cursor = "auto"; }}
                onClick={(e) => { e.stopPropagation(); onRegionSelect(m.name); }}
              >
                <sphereGeometry args={[active ? pinRHov : pinR, 16, 16]} />
                <meshBasicMaterial color={active ? "#f9c96a" : "#f5b245"} />
              </mesh>
              {active && (
                <Html center style={{ pointerEvents: "none" }}>
                  <div style={{
                    fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap",
                    background: "#f5b245", color: "#1a3a1a", padding: "3px 8px",
                    borderRadius: "999px", fontFamily: "Montserrat, sans-serif",
                    pointerEvents: "none", userSelect: "none",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                  }}>
                    {m.name}
                  </div>
                </Html>
              )}
            </group>
          );
        })}

      {/* Trek pins — zoomed in */}
      {isZoomed &&
        TREK_PINS.map((pin, i) => {
          const active = hovered === pin.slug;
          return (
            <group
              key={pin.slug}
              ref={(el) => { pinGroupRefs.current[i] = el; }}
              position={toVec(pin.lat, pin.lon, R + 0.025)}
            >
              {/* Visual sphere */}
              <mesh>
                <sphereGeometry args={[pinR, 14, 14]} />
                <meshBasicMaterial color={active ? "#ffdd60" : "#f5b245"} />
              </mesh>

              {/* Glow ring on hover */}
              {active && (
                <mesh>
                  <ringGeometry args={[0.09, 0.12, 20]} />
                  <meshBasicMaterial color="#ffdd60" transparent opacity={0.4} side={THREE.DoubleSide} />
                </mesh>
              )}

              {/* Invisible hit sphere — stays at natural size for easy clicking */}
              <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(pin.slug); onHover(pin); document.body.style.cursor = "pointer"; }}
                onPointerOut={() => { setHovered(null); onHover(null); document.body.style.cursor = "auto"; }}
                onClick={(e) => { e.stopPropagation(); onTrekSelect(pin.slug); }}
              >
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
              </mesh>
            </group>
          );
        })}
    </group>
  );
}

/* ─── Base-camp modal ───────────────────────────────────────── */
function BaseCampModal({ trek, onClose }: { trek: (typeof treks)[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/55 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.88, y: 18 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative mx-4 w-full max-w-[320px] overflow-hidden rounded-2xl bg-green-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img src={trek.image} alt={trek.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/20 to-transparent" />
          <button onClick={onClose}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors">
            <CloseIcon width={16} height={16} />
          </button>
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-0.5 font-montserrat text-[10px] font-bold text-green-900">
            {trek.difficulty}
          </span>
        </div>
        <div className="p-5">
          <p className="font-montserrat text-[10px] uppercase tracking-widest text-amber-400">{trek.region} Region</p>
          <h3 className="mt-1 font-playfair text-xl font-bold leading-tight text-snow">{trek.name}</h3>
          <p className="mt-2 line-clamp-2 font-lato text-sm leading-relaxed text-snow/65">{trek.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-3 font-montserrat text-[11px] text-snow/55">
            <span className="inline-flex items-center gap-1">
              <ClockIcon width={13} height={13} className="text-amber-400" />{trek.days} days
            </span>
            <span className="inline-flex items-center gap-1">
              <AltitudeIcon width={13} height={13} className="text-amber-400" />{trek.maxAltitude.toLocaleString()} m
            </span>
            <span className="font-semibold text-amber-300">From ${trek.price.toLocaleString()}</span>
          </div>
          <Link href={`/treks/${trek.slug}`}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 font-montserrat text-xs font-bold text-green-900 hover:bg-amber-300 transition-colors">
            View Full Itinerary <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main ──────────────────────────────────────────────────── */
export default function TrekGlobe({ onSelect }: { onSelect?: (name: string) => void }) {
  const zoomRef = useRef(0);
  const controlsRef = useRef<any>(null);
  const [zoom, setZoom] = useState(0);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = useState<(typeof TREK_PINS)[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isZoomed = zoom > 0.45;
  const trek = selectedSlug ? treks.find((t) => t.slug === selectedSlug) ?? null : null;

  // Non-passive wheel so preventDefault actually works
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.max(0, Math.min(1, zoomRef.current + (e.deltaY > 0 ? -0.1 : 0.1)));
      zoomRef.current = next;
      setZoom(next);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const zoomOut = useCallback(() => { zoomRef.current = 0; setZoom(0); }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">

      {/* Scroll hint */}
      <AnimatePresence>
        {!isZoomed && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            transition={{ delay: 0.6 }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 rounded-full bg-green-900/75 px-4 py-2 backdrop-blur-sm"
          >
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="text-amber-300">
              <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.5" />
              <motion.rect x="5.5" y="4" width="3" height="5" rx="1.5" fill="currentColor"
                animate={{ y: [4, 8, 4] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} />
            </svg>
            <span className="font-montserrat text-[11px] text-amber-200">Scroll to zoom into Nepal</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to globe button */}
      <AnimatePresence>
        {isZoomed && (
          <motion.button
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            onClick={zoomOut}
            className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-green-900/90 px-3 py-1.5 font-montserrat text-[11px] text-amber-200 backdrop-blur-sm hover:bg-green-800 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Back to globe
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hovered pin info bar */}
      <AnimatePresence>
        {isZoomed && hoveredPin && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-3 rounded-full bg-green-900/90 px-4 py-2 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="font-montserrat text-[11px] font-semibold text-amber-200">{hoveredPin.label}</span>
            <span className="font-montserrat text-[10px] text-amber-400/70">{hoveredPin.alt.toLocaleString()} m · click to view</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3-D Canvas */}
      <Canvas camera={{ position: [0, 0, FAR_Z], fov: FAR_FOV }} dpr={[1, 1.8]} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 3, 5]} intensity={1.4} color="#ffe6c0" />
        <CameraRig zoomRef={zoomRef} controlsRef={controlsRef} />
        <GlobeMesh
          zoomRef={zoomRef}
          isZoomed={isZoomed}
          onRegionSelect={(name) => onSelect?.(name)}
          onTrekSelect={(slug) => { setSelectedSlug(slug); onSelect?.(slug); }}
          onHover={setHoveredPin}
        />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          minDistance={FAR_Z}
          maxDistance={FAR_Z}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Base-camp modal */}
      <AnimatePresence>
        {trek && <BaseCampModal trek={trek} onClose={() => setSelectedSlug(null)} />}
      </AnimatePresence>
    </div>
  );
}
