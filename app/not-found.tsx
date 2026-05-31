import Link from "next/link";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { PeakIcon, ArrowRight } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-green-900 text-center text-snow">
      <AnimatedBackground variant="mountains" tone="light" />
      <AnimatedBackground variant="snow" tone="light" />
      <div className="relative z-10 px-6">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-400 text-green-900">
          <PeakIcon width={44} height={44} strokeWidth={1.6} />
        </span>
        <p className="mt-8 font-playfair text-7xl font-bold text-amber-400 md:text-8xl">404</p>
        <h1 className="mt-2 font-playfair text-3xl font-bold text-snow md:text-4xl">
          You&apos;ve gone off trail…
        </h1>
        <p className="mx-auto mt-4 max-w-md font-lato text-snow/75">
          This path doesn&apos;t lead anywhere on our map. Let&apos;s get you back to
          base camp.
        </p>
        <Link href="/" className="btn btn-amber group mt-8">
          Back to Home
          <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
