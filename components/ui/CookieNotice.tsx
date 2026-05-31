"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("nta-cookie-ok");
    if (!seen) {
      const t = setTimeout(() => setShow(true), 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("nta-cookie-ok", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-0 left-0 z-[95] w-full border-t border-amber-400/20 bg-green-900/95 px-6 py-4 backdrop-blur md:px-12"
        >
          <div className="container-trek flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center font-lato text-sm text-snow/80 sm:text-left">
              We use cookies to make your trip planning smoother. By continuing you
              agree to our cookie use. 🍪
            </p>
            <button onClick={accept} className="btn btn-amber whitespace-nowrap px-6 py-2.5 text-xs">
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
