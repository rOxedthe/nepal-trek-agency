import { PeakIcon } from "@/components/ui/Icons";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-green-900">
      <span className="flex h-16 w-16 animate-float-slow items-center justify-center rounded-2xl bg-amber-400 text-green-900">
        <PeakIcon width={36} height={36} strokeWidth={1.6} />
      </span>
      <p className="mt-5 font-playfair text-xl text-snow">Nepal Trek Agency</p>
      <div className="mt-4 h-1 w-40 overflow-hidden rounded-full bg-green-800">
        <div className="h-full w-1/2 animate-[shimmer_1.2s_infinite] rounded-full bg-amber-400" />
      </div>
    </div>
  );
}
