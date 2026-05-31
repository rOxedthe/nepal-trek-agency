"use client";

import { WhatsAppIcon } from "./Icons";

export default function WhatsAppButton() {
  const href =
    "https://wa.me/9779866690671?text=" +
    encodeURIComponent("Hi, I'd like to inquire about a trek");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-trek transition-transform duration-300 hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 group-hover:opacity-0" />
      <WhatsAppIcon width={30} height={30} className="relative" />
    </a>
  );
}
