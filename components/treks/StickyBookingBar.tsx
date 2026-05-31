"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function StickyBookingBar({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 z-[80] w-full border-t border-amber-400/20 bg-green-900/97 px-5 py-3 backdrop-blur lg:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-playfair text-sm text-snow">{name}</p>
              <p className="font-montserrat text-xs text-amber-300">
                From ${price.toLocaleString()}
              </p>
            </div>
            <Link href="/contact" className="btn btn-amber whitespace-nowrap px-5 py-2.5 text-xs">
              Book Now
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
